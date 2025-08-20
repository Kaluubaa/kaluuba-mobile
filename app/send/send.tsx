import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Container } from '~/components/reusbales/Container';
import Header from '~/components/reusbales/Header';
import { Ionicons } from '@expo/vector-icons';
import { images } from '~/constants/images';
import { router } from 'expo-router';

const Send = () => {
  const wallettypes = [
    {
      type: 'Kaluuba Wallet',
      onPress: () => router.push({ pathname: '/send/kaluuba' }),
    },
    {
      type: 'External Wallet',
      onPress: () => router.push({ pathname: '/send/external' }),
    },
    {
      type: 'Bank Account',
      onPress: () => router.push({ pathname: '/send/bank' }),
    },
  ];
  return (
    <Container className="flex-1 bg-gray-50 px-2">
      {/* <Image
        source={images.pattern}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        resizeMode="cover"
      /> */}
      <Header title="Send Funds" />
      <Text className="font-jarkataregular text-gray-600">
        Select the type of wallet you&apos;re sending to
      </Text>

      <View className="mt-8 flex-1 gap-4">
        {wallettypes.map((wallet, index) => (
          <TouchableOpacity
            key={index}
            onPress={wallet.onPress}
            className="w-full flex-row items-center justify-between rounded-xl border border-gray-200 bg-white py-3">
            <Text className="ml-4 font-jarkatamedium text-base text-gray-800">{wallet.type}</Text>
            <View className="mr-4">
              <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};

export default Send;
