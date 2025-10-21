import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Recommended = () => {
  return (
    <View className="mt-5 w-full">
      <Text className="font-jarkatasemibold  text-[13px] tracking-wider text-gray-900">Quick Actions</Text>

      <View className="mt-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/invoices')}
          className="group border border-gray-100 h-[100px] w-[31%] overflow-hidden rounded-xl bg-white px-2 py-4">
          <View className=" flex-row items-center justify-between ">
            <Text className="font-jarkatabold text-sm text-gray-800 group-hover:text-base">
              {' '}
              Invoice
            </Text>
            <Ionicons name="chevron-forward" className="text-gray-50 font-jarkatamedium"  size={14} color="#000000" />
          </View>

          <Image
            source={{
              uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/invoice-5979444-4936483.png',
            }}
            style={{ width: 60, height: 60, opacity: 0.6 }}
            resizeMode="contain"
            className="absolute -bottom-6 -right-6 h-[70px] w-[70px]"
          />
        </TouchableOpacity>
        <TouchableOpacity className="group border border-gray-100 h-[100px] w-[31%] overflow-hidden rounded-xl bg-white px-2 py-4">
          <View className=" flex-row items-center justify-between ">
            <Text className="font-jarkatabold text-sm text-gray-800 group-hover:text-base">
              {' '}
              Cards
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color="#000000"
              className="text-gray-50 font-jarkatamedium absolute right-2 top-0"
            />
          </View>

          <Image
            source={{
              uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/credit-card-with-money-9365258-7621425.png',
            }}
            style={{ width: 60, height: 60, opacity: 0.6 }}

            resizeMode="contain"
            className="absolute -bottom-5 -right-5 h-[70px] w-[70px]"
          />
        </TouchableOpacity>
        <TouchableOpacity className="group border border-gray-100 h-[100px] w-[31%] overflow-hidden rounded-xl bg-white px-2 py-4">
          <View className=" flex-row items-center justify-between ">
            <Text className="font-jarkatabold text-sm text-gray-800 group-hover:text-base">
              {' '}
              Giftcards
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color="#000000"
              className="text-gray-50 font-jarkatamedium absolute right-2 top-0"
            />
          </View>

          <Image
            source={{
              uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/gift-card-8567218-6757143.png',
            }}
            style={{ width: 60, height: 60, opacity: 0.6 }}

            resizeMode="contain"
            className="absolute -bottom-4 -right-3 h-[70px] w-[70px]"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Recommended;
