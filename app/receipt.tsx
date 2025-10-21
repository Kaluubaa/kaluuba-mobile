import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import * as Clipboard from 'expo-clipboard';

const Receipt = () => {
  const { 
    amount, 
    currency, 
    recipient, 
    transactionId, 
    fee, 
    timestamp, 
    status, 
    errorMessage,
    type,
    counterparty
  } = useLocalSearchParams();
  
  const transactionStatus = status || 'completed';
  const isCompleted = transactionStatus === 'completed' || transactionStatus === 'confirmed';
  const isPending = transactionStatus === 'pending';
  const isFailed = transactionStatus === 'failed';
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB') + ', ' + date.toLocaleTimeString('en-GB', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Copied!', 'Reference code copied to clipboard');
    } catch {
      Alert.alert('Error', 'Failed to copy');
    }
  };

  const handleShare = async () => {
    try {
      const shareText = `Transaction Receipt\n\nAmount: $${amount} ${currency}\nRecipient: ${recipient}\nTransaction ID: ${transactionId}\nStatus: ${transactionStatus}\nDate: ${formatDate(timestamp as string)}`;
      
      // You can implement actual sharing here
      Alert.alert('Share Receipt', 'Receipt sharing will be implemented soon');
    } catch (error) {
      console.log('Share error:', error);
      Alert.alert('Error', 'Failed to share receipt');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <View className="flex-1 px-6 pt-4">
        {/* Header */}
        <View className="mb-8 flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-2xl font-jarkatabold text-black">
            Transaction Receipt
          </Text>
        </View>

        {/* Status Animation */}
        <View className="items-center mb-8">
          <View className="h-24 w-24 items-center justify-center mb-4">
            {isCompleted && (
              <LottieView
                autoPlay
                loop={false}
                source={require('../assets/animations/success.json')}
                style={{ width: '100%', height: '100%' }}
              />
            )}
            {isPending && (
              <LottieView
                autoPlay
                loop={true}
                source={require('../assets/animations/loading-drop.json')}
                style={{ width: '100%', height: '100%' }}
              />
            )}
            {isFailed && (
              <View className="h-24 w-24 items-center justify-center rounded-full bg-red-100">
                <Ionicons name="close-circle" size={48} color="#EF4444" />
              </View>
            )}
          </View>
          
          <Text className={`text-sm font-jarkataregular mb-2 ${
            isCompleted ? 'text-green-600' : 
            isPending ? 'text-blue-600' : 
            'text-red-600'
          }`}>
            {isCompleted ? 'SEND' : isPending ? 'PENDING' : 'FAILED'}
          </Text>
          
          <Text className="text-4xl font-jarkatabold text-black">${amount}</Text>
          
          {isPending && (
            <Text className="text-sm font-jarkataregular text-blue-600 mt-2 text-center">
              Your transaction is being processed
            </Text>
          )}
          
          {isFailed && errorMessage && (
            <Text className="text-sm font-jarkataregular text-red-600 mt-2 text-center px-4">
              {errorMessage}
            </Text>
          )}
        </View>

        {/* Transaction Details */}
        <View className="bg-white rounded-xl p-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-jarkataregular text-gray-600">Date and Time</Text>
            <Text className="text-sm font-jarkatamedium text-black">
              {formatDate(timestamp as string)}
            </Text>
          </View>
          
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-jarkataregular text-gray-600">Transaction Type</Text>
            <Text className="text-sm font-jarkatamedium text-black">
              {type === 'outgoing' ? 'Send' : 'Receive'}
            </Text>
          </View>
          
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-jarkataregular text-gray-600">Amount Sent</Text>
            <Text className="text-sm font-jarkatamedium text-black">${amount} {currency}</Text>
          </View>
          
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-jarkataregular text-gray-600">Amount Received</Text>
            <Text className="text-sm font-jarkatamedium text-black">
              ${(parseFloat(amount as string) - parseFloat(fee as string || '0')).toFixed(2)} {currency}
            </Text>
          </View>
          
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-jarkataregular text-gray-600">Fee</Text>
            <Text className="text-sm font-jarkatamedium text-black">${fee || '0.00'}</Text>
          </View>
          
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-jarkataregular text-gray-600">Recipient</Text>
            <Text className="text-sm font-jarkatamedium text-black">{recipient}</Text>
          </View>
          
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-sm font-jarkataregular text-gray-600">Reference Code</Text>
            <TouchableOpacity 
              onPress={() => copyToClipboard(transactionId as string)}
              className="flex-row items-center"
            >
              <Text className="text-sm font-jarkatamedium text-black mr-2">{transactionId}</Text>
              <Ionicons name="copy-outline" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-jarkataregular text-gray-600">Status</Text>
            <View className="flex-row items-center">
              <View className={`w-2 h-2 rounded-full mr-2 ${
                isCompleted ? 'bg-green-500' : 
                isPending ? 'bg-blue-500' : 
                'bg-red-500'
              }`} />
              <Text className={`text-sm font-jarkataregular ${
                isCompleted ? 'text-green-600' : 
                isPending ? 'text-blue-600' : 
                'text-red-600'
              }`}>
                {isCompleted ? 'Completed' : isPending ? 'Pending' : 'Failed'}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-1 justify-end pb-6">
          {isCompleted && (
            <TouchableOpacity
              onPress={handleShare}
              className="w-full py-4 rounded-xl bg-primary-500 mb-4"
            >
              <Text className="text-center text-base font-jarkatamedium text-white">
                Share Transaction Receipt
              </Text>
            </TouchableOpacity>
          )}
          
          {isPending && (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Transaction Pending', 
                  'Your transaction is being processed. You can check the status later or contact support if it takes too long.'
                );
              }}
              className="w-full py-4 rounded-xl bg-blue-100 mb-4"
            >
              <Text className="text-center text-base font-jarkatamedium text-blue-700">
                Check Status Later
              </Text>
            </TouchableOpacity>
          )}
          
          {isFailed && (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              className="w-full py-4 rounded-xl bg-red-100 mb-4"
            >
              <Text className="text-center text-base font-jarkatamedium text-red-700">
                Try Again
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/home')}
            className="w-full py-4 rounded-xl bg-gray-200"
          >
            <Text className="text-center text-base font-jarkatamedium text-gray-700">
              Go Back Home
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Report Problem', 'Problem reporting will be implemented soon');
            }}
            className="w-full py-2 mt-2"
          >
            <Text className="text-center text-sm font-jarkataregular text-gray-500">
              Report a problem
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Receipt;
