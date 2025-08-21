import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Recommended = () => {
  return (
    <View className="mt-3 w-full">
      <Text className="font-clashmedium tracking-wider text-gray-800">Recommended</Text>

      <View className="mt-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/invoices')}
          className="group h-[100px] w-[31%] overflow-hidden rounded-xl bg-white px-2 py-4">
          <View className=" flex-row items-center justify-between ">
            <Text className="font-jarkatasemibold text-sm text-gray-800 group-hover:text-base">
              {' '}
              Invoice
            </Text>
            <Ionicons name="chevron-forward" size={14} color="#6B7280" />
          </View>

          <Image
            source={{
              uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/invoice-5979444-4936483.png',
            }}
            style={{ width: 70, height: 70 }}
            resizeMode="contain"
            className="absolute -bottom-6 -right-6 h-[70px] w-[70px]"
          />
        </TouchableOpacity>
        <TouchableOpacity className="group h-[100px] w-[31%] overflow-hidden rounded-xl bg-white px-2 py-4">
          <View className=" flex-row items-center justify-between ">
            <Text className="font-jarkatasemibold text-sm text-gray-800 group-hover:text-base">
              {' '}
              Cards & Payments
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color="#6B7280"
              className="absolute right-2 top-0"
            />
          </View>

          <Image
            source={{
              uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/credit-card-with-money-9365258-7621425.png',
            }}
            style={{ width: 70, height: 70 }}
            resizeMode="contain"
            className="absolute -bottom-5 -right-5 h-[70px] w-[70px]"
          />
        </TouchableOpacity>
        <TouchableOpacity className="group h-[100px] w-[31%] overflow-hidden rounded-xl bg-white px-2 py-4">
          <View className=" flex-row items-center justify-between ">
            <Text className="font-jarkatasemibold text-sm text-gray-800 group-hover:text-base">
              {' '}
              Giftcards
            </Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color="#6B7280"
              className="absolute right-2 top-0"
            />
          </View>

          <Image
            source={{
              uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/gift-card-8567218-6757143.png',
            }}
            style={{ width: 70, height: 70 }}
            resizeMode="contain"
            className="absolute -bottom-4 -right-3 h-[70px] w-[70px]"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Recommended;
