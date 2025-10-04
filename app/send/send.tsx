import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Send = () => {
  const sendOptions = [
    {
      title: 'Send via Kaluuba Tag',
      subtitle: 'Send funds instantly to your friends or colleagues using their Kaluuba Tag',
      icon: 'at-outline',
      onPress: () => router.push({ pathname: '/send/kaluuba' }),
    },
    {
      title: 'Send to Wallet Address',
      subtitle: 'Send crypto through different networks to any wallet address',
      icon: 'link-outline',
      onPress: () => router.push({ pathname: '/send/external' }),
    },
    {
      title: 'Send to Fiat Account',
      subtitle: 'Use bank transfer to send money to a previous or new recipient',
      icon: 'business-outline',
      onPress: () => router.push({ pathname: '/send/bank' }),
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View className="flex-1 px-6 pt-4">
          <View className="mb-8 flex gap-3">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={22} color="#000" />
            </TouchableOpacity>
            <Text className="font-jarkatasemibold text-2xl font-semibold text-black">
              Send Money
            </Text>
          </View>

          <View className="flex-1">
            {sendOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={option.onPress}
                className="mb-6 flex-row items-center">
                <View
                  className="mr-4 h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#E6F7F8' }}>
                  <Ionicons name={option.icon as any} size={20} color="#167D7F" />
                </View>

                <View className="flex-1">
                  <Text className="mb-1 font-jarkatamedium text-lg font-semibold text-black">
                    {option.title}
                  </Text>
                  <Text className="font-jarkataregular text-sm text-gray-600">
                    {option.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Send;
