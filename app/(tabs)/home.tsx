import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Container } from '~/components/reusbales/Container';
import BalanceCard from '~/components/home/BalanceCard';
import { Ionicons } from '@expo/vector-icons';
import TransactionHistory from '~/components/home/TransactionHistory';
import SwiperAds from '~/components/home/SwipperAds';
import { router } from 'expo-router';

const home = () => {
  const actions = [
    {
      title: 'Invoice',
      icon: 'document-attach-outline',
      onPress: () => router.push('/screens/create-invoice'),
    },
    {
      title: 'Scan',
      icon: 'scan-outline',
      onPress: () => console.log('Scan pressed'),
    },
    {
      title: 'Recieve',
      icon: 'arrow-down-outline',
      onPress: () => console.log('Add pressed'),
    },
    {
      title: 'Withdraw',
      icon: 'arrow-up-outline',
      onPress: () => console.log('Withdraw pressed'),
    },
  ];
  return (
    <Container className="py-6">
      <View className="flex-1 gap-6">
        <View className="flex-row justify-between">
          <View className="h-12 w-12 rounded-full bg-gray-300"> </View>

          <View className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600">
            <Text className="font-clashmedium text-sm text-white">K</Text>
          </View>
        </View>
        <BalanceCard />
        <View className="flex-row justify-between px-3">
          {actions.map((action, index) => (
            <Pressable onPress={action.onPress} key={index}>
              <View className="h-[48px] w-[48px] items-center justify-center rounded-full bg-white">
                <Ionicons name={action.icon as keyof typeof Ionicons.glyphMap} size={18} />
              </View>
              <Text className="mt-2 text-center font-jarkataregular text-sm text-gray-800">
                {action.title}
              </Text>
            </Pressable>
          ))}
        </View>
        {/* <SwiperAds /> */}
        <TransactionHistory />
      </View>
    </Container>
  );
};

export default home;
