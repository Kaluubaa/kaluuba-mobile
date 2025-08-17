import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const transactions: {
  id: string;
  type: string;
  description: string;
  amount: string;
  date: string;
  time: string;
  icon: string;
  color: string;
  category: string;
  status: string;
}[] = [];

const TransactionHistory = () => {
  return (
    <View className="mt-8 px-2">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-clashmedium text-gray-600 tracking-wider">Recent Transactions</Text>
        <TouchableOpacity onPress={() => router.push('/history')}>
          <View className="flex-row items-center gap-2">
            <Text className="font-jarkatamedium text-sm text-primary-600">See all</Text>
            <Ionicons name="arrow-forward" size={16} color="#0c89eb" />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center border-b border-gray-100 py-3">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Ionicons name={item.icon as any} size={18} className={item.color} />
            </View>
            <View className="flex-1">
              <Text className="font-jarkatamedium text-sm text-gray-900">{item.type}</Text>
              <Text className="text-xs text-gray-400">{item.date}</Text>
            </View>
            <Text className={`font-jarkatamedium text-xs  ${item.color}`}>{item.amount}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-gray-400">No transactions yet.</Text>
          </View>
        }
        scrollEnabled={false}
      />
    </View>
  );
};

export default TransactionHistory;
