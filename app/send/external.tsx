import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, TouchableWithoutFeedback, Keyboard, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';

const External = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [validationError, setValidationError] = useState('');

  const validateAddress = (address: string) => {
    // Basic Ethereum address validation (42 characters, starts with 0x)
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethAddressRegex.test(address);
  };

  const handleAddressChange = (text: string) => {
    setWalletAddress(text);
    setValidationError('');
    setIsValid(false);

    if (text.length > 0) {
      const isValidAddress = validateAddress(text);
      setIsValid(isValidAddress);
      if (!isValidAddress && text.length >= 10) {
        setValidationError('Please enter a valid wallet address');
      }
    }
  };

  const handleContinue = () => {
    if (!walletAddress.trim()) {
      Alert.alert('Error', 'Please enter a wallet address');
      return;
    }

    if (!isValid) {
      Alert.alert('Error', 'Please enter a valid wallet address');
      return;
    }

    // Navigate to amount page with the wallet address
    router.push({
      pathname: '/send/amount',
      params: {
        from: 'external',
        walletAddress: walletAddress.trim(),
      },
    });
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await Clipboard.getStringAsync();
      if (clipboardText) {
        setWalletAddress(clipboardText);
        handleAddressChange(clipboardText);
      } else {
        Alert.alert('Clipboard Empty', 'No text found in clipboard');
      }
    } catch (error) {
      console.log('Paste error:', error);
      Alert.alert('Error', 'Failed to paste from clipboard');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
        <View className="flex-1 px-6 pt-4">
          {/* Header */}
          <View className="mb-8 flex gap-3">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mr-4"
            >
              <Ionicons name="arrow-back" size={22} color="#000" />
            </TouchableOpacity>
            <Text className="text-2xl font-jarkatabold text-black">
              Send to Wallet Address
            </Text>
          </View>

          {/* Content */}
          <View className="flex-1">
            <Text className="text-base font-jarkatamedium text-gray-700 mb-8">
              Enter the wallet address you want to send funds to
            </Text>

            {/* Address Input */}
            <View className="mb-6">
              <Text className="text-sm font-jarkatamedium text-gray-900 mb-2">
                Wallet Address
              </Text>
              <View className="relative">
                <TextInput
                  value={walletAddress}
                  onChangeText={handleAddressChange}
                  placeholder="0x..."
                  placeholderTextColor="#9CA3AF"
                  className={`border rounded-xl px-4 py-4 text-base font-jarkataregular ${
                    validationError 
                      ? 'border-red-500 bg-red-50' 
                      : isValid 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 bg-white'
                  }`}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                />
                
                {/* Validation Icon */}
                {walletAddress.length > 0 && (
                  <View className="absolute right-3 top-4">
                    {isValid ? (
                      <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    ) : validationError ? (
                      <Ionicons name="close-circle" size={20} color="#EF4444" />
                    ) : (
                      <Ionicons name="time-outline" size={20} color="#6B7280" />
                    )}
                  </View>
                )}
              </View>

              {/* Error Message */}
              {validationError && (
                <Text className="text-sm font-jarkataregular text-red-500 mt-2">
                  {validationError}
                </Text>
              )}

              {/* Success Message */}
              {isValid && (
                <Text className="text-sm font-jarkataregular text-green-600 mt-2">
                  Valid wallet address
                </Text>
              )}
            </View>

            {/* Paste Button */}
            <TouchableOpacity
              onPress={handlePaste}
              className="mb-8 flex-row items-center justify-center py-3 border border-gray-300 rounded-xl"
            >
              <Ionicons name="clipboard-outline" size={20} color="#6B7280" />
              <Text className="text-base font-jarkatamedium text-gray-700 ml-2">
                Paste from Clipboard
              </Text>
            </TouchableOpacity>

            {/* Info Box */}
            <View className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-jarkatamedium text-blue-900 mb-1">
                    Important
                  </Text>
                  <Text className="text-sm font-jarkataregular text-blue-800">
                    Make sure you have the correct wallet address. Transactions cannot be reversed once sent.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <View className="pb-6">
            <TouchableOpacity
              onPress={handleContinue}
              disabled={!isValid || walletAddress.length === 0}
              className={`py-4 rounded-xl ${
                isValid && walletAddress.length > 0
                  ? 'bg-primary-500'
                  : 'bg-gray-300'
              }`}
            >
              <Text className={`text-center text-base font-jarkatabold ${
                isValid && walletAddress.length > 0
                  ? 'text-white'
                  : 'text-gray-500'
              }`}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default External;