import { View, Text, TouchableOpacity, Animated, Alert, Image } from 'react-native';
import React, { useState, useRef } from 'react';
import Header from '~/components/reusbales/Header';
import { Container } from '~/components/reusbales/Container';
import { NumericKeypad } from '~/components/reusbales/NumericKeypad';
import { router, useLocalSearchParams } from 'expo-router';
import { useGetUserBalance, useSendToken } from '~/hooks/use-transactions';
import { Button } from '~/components/reusbales/Button';
import { Ionicons } from '@expo/vector-icons';
import { images } from '~/constants/images';

const Amount = () => {
  const { kaluubaName, coin } = useLocalSearchParams();
  const [amount, setAmount] = useState('0.00');
  const { data: balance } = useGetUserBalance();

  const { mutate: send, isPending: isSending } = useSendToken();

  const amountScaleAnim = useRef(new Animated.Value(1)).current;
  const amountOpacityAnim = useRef(new Animated.Value(1)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  const animateAmountChange = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(amountScaleAnim, {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(amountOpacityAnim, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(amountScaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(amountOpacityAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const handleKeypadPress = (key: string) => {
    if (key === '<') {
      setAmount((prev) => {
        const num = parseFloat(prev.replace('.', '')) / 100;
        const newNum = Math.floor(num * 10) / 100;
        return newNum.toFixed(2);
      });
    } else if (key === '.') {
      return;
    } else {
      setAmount((prev) => {
        const num = parseFloat(prev.replace('.', '')) / 100;
        const newNum = num * 10 + parseInt(key) / 100;
        return newNum.toFixed(2);
      });
    }
    animateAmountChange();
  };

  const handleSubmit = () => {
    const amountValue = parseFloat(amount);
    const balanceValue = 10.0; // Replace with actual balance from API

    if (amountValue > balanceValue) {
      Alert.alert(
        'Insufficient Balance',
        `You don't have enough ${coin} to send ${amount} ${coin}`
      );
      return;
    }

    if (amountValue <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    // Animate button press
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    send(
      {
        recipientIdentifier: kaluubaName as string,
        tokenSymbol: coin as string,
        amount: amountValue,
      },
      {
        onSuccess: (res) => {
          console.log('Transaction successful:', res);
          router.replace('/send/success');
        },
        onError: (error) => {
          console.error('Transaction failed:', error);
          Alert.alert('Transaction Failed', 'Please try again');
        },
      }
    );
  };

  // Get actual balance from API
  const userBalance = balance?.data?.balances?.balances[0]?.formatted;

  console.log('user balll', userBalance);
  const balanceValue = parseFloat(userBalance);
  const amountValue = parseFloat(amount);
  const isInsufficientBalance = amountValue > balanceValue;
  const canSend = amountValue > 0 && amountValue <= balanceValue && !isSending;
  return (
    <Container className="flex-1 bg-gray-50 px-2" loading={isSending}>
      <Header title="Enter Amount" />

      {/* Recipient Info */}
      {/* <View className="mt-6 mb-8">
        <View className="flex-row items-center justify-center">
          <View className="flex-row items-center rounded-2xl bg-white px-4 py-3 shadow-sm border border-gray-100">
            <View className="w-8 h-8 rounded-full bg-primary-100 items-center justify-center mr-3">
              <Ionicons name="person" size={16} color="#6366f1" />
            </View>
            <View>
              <Text className="font-jarkataregular text-xs text-gray-500">Sending to</Text>
              <Text className="font-jarkatamedium text-sm text-gray-800">@{kaluubaName}</Text>
            </View>
          </View>
        </View>
      </View> */}

      <View className="flex-1 items-center justify-center px-4">
        <Animated.View
          style={{
            opacity: amountOpacityAnim,
            transform: [{ scale: amountScaleAnim }],
          }}
          className="items-center">
          {/* Currency Symbol */}
          <View className="mb-6 w-full flex-row items-center gap-3 rounded-full bg-gray-200 px-3 py-1.5 ">
            <View className="size-5 overflow-hidden rounded-full bg-black">
              <Image source={images.usdc} className="h-full w-full" />
            </View>
            <Text className=" font-jarkatamedium text-sm text-gray-600">USDC</Text>

            {/* <Ionicons name="chevron-down" size={15} color={'#6B7280'} /> */}
          </View>

          {/* Amount */}
          <View className="mb-6 items-center">
            <Text className="font-clashmedium text-4xl tracking-tight text-gray-900">{amount}</Text>
            {/* <View className="h-1 w-24 bg-primary-600 rounded-full mt-2" /> */}
          </View>

          {/* Balance Info */}
          <View className="items-center">
            <Text className="mb-1 font-jarkataregular text-sm text-gray-500">
              Available Balance
            </Text>
            <View className="flex-row items-center">
              <Text className="font-jarkatamedium text-lg text-gray-700">
                {balanceValue.toFixed(2)} {coin}
              </Text>
              {isInsufficientBalance && (
                <View className="ml-2 flex-row items-center">
                  <Ionicons name="warning" size={16} color="#ef4444" />
                  <Text className="ml-1 font-jarkataregular text-xs text-red-500">
                    Insufficient
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Keypad and Button */}
      <View className="mt-auto">
        <View className="mb-6 items-center">
          <NumericKeypad onKeyPress={handleKeypadPress} />
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }} className="mb-6">
          <Button
            className={`h-[56px] w-full ${canSend ? 'bg-primary-600' : 'bg-gray-300'}`}
            onPress={handleSubmit}
            disabled={!canSend}>
            <View className="flex-row items-center justify-center">
              {isSending ? (
                <>
                  <Text className="mr-2 font-jarkatamedium text-white">Processing...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                  <Text className="ml-2 font-jarkatamedium text-white">
                    Send {amount} {coin}
                  </Text>
                </>
              )}
            </View>
          </Button>
        </Animated.View>

        {/* Quick Amount Buttons */}
        {/* <View className="flex-row justify-center mb-4">
          <TouchableOpacity
            onPress={() => {
              setAmount((balanceValue * 0.25).toFixed(2));
              animateAmountChange();
            }}
            className="mx-2 rounded-full bg-white px-4 py-2 border border-gray-200">
            <Text className="font-jarkataregular text-sm text-gray-600">25%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount((balanceValue * 0.5).toFixed(2));
              animateAmountChange();
            }}
            className="mx-2 rounded-full bg-white px-4 py-2 border border-gray-200">
            <Text className="font-jarkataregular text-sm text-gray-600">50%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount((balanceValue * 0.75).toFixed(2));
              animateAmountChange();
            }}
            className="mx-2 rounded-full bg-white px-4 py-2 border border-gray-200">
            <Text className="font-jarkataregular text-sm text-gray-600">75%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount(balanceValue.toFixed(2));
              animateAmountChange();
            }}
            className="mx-2 rounded-full bg-white px-4 py-2 border border-gray-200">
            <Text className="font-jarkataregular text-sm text-gray-600">Max</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </Container>
  );
};

export default Amount;
