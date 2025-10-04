import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Image,
} from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useGetUserBalance, useSendToken } from '~/hooks/use-transactions';
import { Ionicons } from '@expo/vector-icons';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { images } from '~/constants/images';
import LottieView from 'lottie-react-native';

const Amount = () => {
  const { kaluubaName, from, walletAddress: externalWalletAddress } = useLocalSearchParams();
  const [amount, setAmount] = useState('');
  const [sendCurrency, setSendCurrency] = useState('USDC');
  const [receiveCurrency, setReceiveCurrency] = useState('USDC');
  const [walletAddress] = useState(
    Array.isArray(externalWalletAddress) 
      ? externalWalletAddress[0] 
      : externalWalletAddress || '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
  );
  const { data: balance } = useGetUserBalance();

  const { mutate: send, isPending: isSending } = useSendToken();

  const currencies = [
    { symbol: 'USDC', name: 'USDC', logo: images.usdc },
    { symbol: 'USDT', name: 'USDT', logo: images.usdc }, 
    { symbol: 'CNGN', name: 'CNGN', logo: images.usdc },
  ];

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return '0';
    return num.toFixed(2);
  };

  const handleSubmit = () => {
    const amountValue = parseFloat(amount);
    const balanceValue = parseFloat(userBalance || '0');

    if (amountValue > balanceValue) {
      Alert.alert(
        'Insufficient Balance',
        `You don't have enough ${sendCurrency} to send $${amount}`
      );
      return;
    }

    if (amountValue <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    // Show confirmation sheet instead of sending directly
    SheetManager.show('confirm-send-sheet');
  };

  const confirmSend = () => {
    const amountValue = parseFloat(amount);
    
    // Close confirmation sheet immediately when starting transaction
    SheetManager.hide('confirm-send-sheet');

    send(
      {
        recipientIdentifier: from === 'external' ? walletAddress : (Array.isArray(kaluubaName) ? kaluubaName[0] : kaluubaName as string),
        tokenSymbol: 'USDC', // Always use USDC for now
        amount: amountValue,
      },
      {
        onSuccess: (res) => {
          console.log('Transaction successful:', res);
          router.replace({
            pathname: '/send/success',
            params: {
              amount: amount,
              currency: sendCurrency,
              recipient: from === 'external' 
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : kaluubaName,
              transactionId: res?.data?.transactionId || 'TXN' + Date.now(),
              fee: sendFee.toString(),
              timestamp: new Date().toISOString(),
              status: 'completed',
            },
          });
        },
        onError: (error) => {
          console.error('Transaction failed:', error);
          // Show receipt with pending/failed status instead of just alert
          const transactionId = 'TXN' + Date.now();
          const errorMessage = error?.message || 'Transaction failed';
          const isPending = errorMessage.toLowerCase().includes('pending') || 
                           errorMessage.toLowerCase().includes('timeout') ||
                           errorMessage.toLowerCase().includes('processing');
          
          router.replace({
            pathname: '/send/success',
            params: {
              amount: amount,
              currency: sendCurrency,
              recipient: from === 'external' 
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : kaluubaName,
              transactionId: transactionId,
              fee: sendFee.toString(),
              timestamp: new Date().toISOString(),
              status: isPending ? 'pending' : 'failed',
              errorMessage: errorMessage,
            },
          });
        },
      }
    );
  };

  const userBalance = balance?.data?.balances?.balances[0]?.formatted || '0';
  const balanceValue = parseFloat(userBalance);
  const amountValue = parseFloat(amount || '0');
  const isInsufficientBalance = amountValue > balanceValue;
  const canSend = amountValue > 0 && !isInsufficientBalance && !isSending;
  const sendFee = 0; // No fee for now
  const recipientAmount = amountValue - sendFee;

  // Loading messages for different states
  const loadingMessages = useMemo(() => [
    'Almost there...',
    'Processing your transaction...',
    'Securing your funds...',
    'Finalizing transfer...',
    'Almost done!',
  ], []);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(loadingMessages[0]);

  // Cycle through loading messages
  useEffect(() => {
    if (isSending) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setCurrentLoadingMessage(loadingMessages[messageIndex]);
      }, 2000); // Change message every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isSending, loadingMessages]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <SafeAreaView className="flex-1 bg-white">
          <StatusBar barStyle="dark-content" backgroundColor="white" />

          <View className="flex-1 px-6 pt-4">
            {/* Header */}
            <View className="mb-8 flex gap-2">
              <TouchableOpacity onPress={() => router.back()} className="mr-4">
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text className="font-jarkatabold text-2xl text-black">
                Send money to a Kaluuba user
              </Text>
            </View>

            <Text className="mb-8 font-jarkataregular text-base text-gray-600">
              Enter amount to send to recipient
            </Text>

            {/* Amount to Send Section */}
            <View className="mb-6">
              <Text className="mb-3 font-jarkatamedium text-sm text-black">Amount to send</Text>
              <View className="rounded-xl bg-gray-100 p-4">
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => SheetManager.show('send-currency-sheet')}
                    className="flex-row items-center">
                    <Image
                      source={
                        currencies.find((c) => c.symbol === sendCurrency)?.logo || images.usdc
                      }
                      className="mr-2 h-6 w-6"
                    />
                    <Text className="mr-1 font-jarkatamedium text-base text-black">
                      {sendCurrency}
                    </Text>
                    <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                  <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="0"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    className="text-right font-jarkataregular text-3xl text-gray-400"
                    style={{ minWidth: 100 }}
                  />
            </View>
                <Text className="mt-2 font-jarkataregular text-sm text-gray-500">
                  Bal: ${balanceValue.toFixed(2)}
                </Text>
                {isInsufficientBalance && (
                  <View className="mt-2 flex-row items-center">
                    <Ionicons name="warning" size={16} color="#ef4444" />
                    <Text className="ml-1 font-jarkataregular text-sm text-red-500">
                      Insufficient balance
                    </Text>
          </View>
                )}
        </View>
            </View>

            {/* Transaction Summary */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between py-2">
                <Text className="font-jarkataregular text-sm text-gray-600">Send fee</Text>
                <Text className="font-jarkataregular text-sm text-gray-600">
                  - ${sendFee.toFixed(2)}
                </Text>
          </View>
              <View className="flex-row items-center justify-between py-2">
                <Text className="font-jarkataregular text-sm text-gray-600">
                  Amount we&apos;ll send
            </Text>
                <Text className="font-jarkataregular text-sm text-gray-600">
                  = ${recipientAmount.toFixed(2)}
              </Text>
              </View>
              {from === 'external' && (
                <View className="flex-row items-center justify-between py-2">
                  <Text className="font-jarkataregular text-sm text-gray-600">Wallet address</Text>
                  <Text
                    className="font-jarkataregular font-mono text-sm text-gray-600"
                    numberOfLines={1}>
                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                  </Text>
                </View>
              )}
            </View>

            {/* Recipient Will Receive Section */}
            <View className="mb-8">
              <Text className="mb-3 font-jarkatamedium text-sm text-black">
                Recipient will receive
              </Text>
              <View className="rounded-xl bg-gray-100 p-4">
                <View className="flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => SheetManager.show('receive-currency-sheet')}
                    className="flex-row items-center">
                    <Image
                      source={
                        currencies.find((c) => c.symbol === receiveCurrency)?.logo || images.usdc
                      }
                      className="mr-2 h-6 w-6"
                    />
                    <Text className="mr-1 font-jarkatamedium text-base text-black">
                      {receiveCurrency}
                    </Text>
                    <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                  <Text className="font-jarkataregular text-3xl text-gray-400">
                    {amount ? `$${formatAmount(recipientAmount.toString())}` : '$0'}
                  </Text>
            </View>
          </View>
              <View className="mt-2 flex-row items-center">
                <Ionicons name="flash" size={16} color="#9CA3AF" />
                <Text className="ml-1 font-jarkataregular text-sm text-gray-500">
                  Usually arrives in a second
                </Text>
      </View>
        </View>

            {/* Continue Button */}
            <View className="mb-6 mt-auto">
              <TouchableOpacity
            onPress={handleSubmit}
                className={`w-full rounded-xl py-4 ${canSend ? 'bg-primary-600' : 'bg-gray-200'}`}
            disabled={!canSend}>
                <Text
                  className={`text-center font-jarkatamedium text-base ${
                    canSend ? 'text-gray-50' : 'text-gray-400'
                  }`}>
                  Continue
                  </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Currency Selection Bottom Sheets */}
          <ActionSheet
            id="send-currency-sheet"
            isModal={true}
            closable={true}
            backgroundInteractionEnabled={false}
            containerStyle={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: 'white',
            }}>
            <View className="px-6 py-6">
              <Text className="mb-6 text-center font-jarkatabold text-lg text-black">
                Select Currency
              </Text>
              {currencies.map((currency, index) => (
          <TouchableOpacity
                  key={index}
            onPress={() => {
                    setSendCurrency(currency.symbol);
                    SheetManager.hide('send-currency-sheet');
                  }}
                  className="flex-row items-center border-b border-gray-100 py-4">
                  <Image source={currency.logo} className="mr-3 h-6 w-6" />
                  <Text className="font-jarkatamedium text-base text-black">{currency.name}</Text>
                  {sendCurrency === currency.symbol && (
                    <Ionicons name="checkmark" size={20} color="#167D7F" className="ml-auto" />
                  )}
          </TouchableOpacity>
              ))}
            </View>
          </ActionSheet>

          <ActionSheet
            id="receive-currency-sheet"
            isModal={true}
            closable={true}
            backgroundInteractionEnabled={false}
            containerStyle={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: 'white',
            }}>
            <View className="px-6 py-6">
              <Text className="mb-6 text-center font-jarkatabold text-lg text-black">
                Select Currency
              </Text>
              {currencies.map((currency, index) => (
          <TouchableOpacity
                  key={index}
            onPress={() => {
                    setReceiveCurrency(currency.symbol);
                    SheetManager.hide('receive-currency-sheet');
                  }}
                  className="flex-row items-center border-b border-gray-100 py-4">
                  <Image source={currency.logo} className="mr-3 h-6 w-6" />
                  <Text className="font-jarkatamedium text-base text-black">{currency.name}</Text>
                  {receiveCurrency === currency.symbol && (
                    <Ionicons name="checkmark" size={20} color="#167D7F" className="ml-auto" />
                  )}
          </TouchableOpacity>
              ))}
            </View>
          </ActionSheet>

        {/* Confirmation Sheet */}
        <ActionSheet
          id="confirm-send-sheet"
          isModal={true}
          closable={true}
          backgroundInteractionEnabled={false}
          containerStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: 'white',
          }}>
          <View className="py-6 px-6">
            <Text className="text-xl font-jarkatabold text-black mb-2 text-center">Confirm Send</Text>
            <Text className="text-sm font-jarkataregular text-gray-600 mb-6 text-center">
              Please review your transaction details before sending
            </Text>

            {/* Transaction Details */}
            <View className="bg-gray-50 rounded-xl p-4 mb-6">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm font-jarkataregular text-gray-600">Recipient</Text>
                <Text className="text-sm font-jarkatamedium text-black">
                  {from === 'external' 
                    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : `@${kaluubaName}`
                  }
                </Text>
              </View>
              
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm font-jarkataregular text-gray-600">Amount</Text>
                <Text className="text-sm font-jarkatamedium text-black">${amount} {sendCurrency}</Text>
              </View>
              
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm font-jarkataregular text-gray-600">Fee</Text>
                <Text className="text-sm font-jarkatamedium text-black">${sendFee.toFixed(2)}</Text>
              </View>
              
              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-jarkataregular text-gray-600">Total</Text>
                <Text className="text-sm font-jarkatabold text-black">${(parseFloat(amount || '0') + sendFee).toFixed(2)}</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
          <TouchableOpacity
                onPress={() => SheetManager.hide('confirm-send-sheet')}
                className="flex-1 py-4 rounded-xl bg-gray-200"
              >
                <Text className="text-center text-base font-jarkatamedium text-gray-700">
                  Cancel
                </Text>
          </TouchableOpacity>
              
          <TouchableOpacity
                onPress={confirmSend}
                className="flex-1 py-4 rounded-xl bg-[#167D7F]"
              >
                <Text className="text-center text-base font-jarkatamedium text-white">
                  Confirm Send
                </Text>
          </TouchableOpacity>
            </View>
          </View>
        </ActionSheet>
        </SafeAreaView>

        {/* Loading Overlay */}
        {isSending && (
          <View className="absolute inset-0 flex-1 items-center justify-center bg-black/70">
            <View className="items-center">
              <View className="h-24 w-24">
                <LottieView
                  source={require('../../assets/animations/loading-drop.json')}
                  autoPlay
                  loop
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <Text className="mt-4 text-center font-jarkatamedium text-lg text-gray-100">
                {currentLoadingMessage}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Amount;
