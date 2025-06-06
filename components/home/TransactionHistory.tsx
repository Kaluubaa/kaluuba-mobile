import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const transactions = [
  {
    id: '1',
    type: 'Received',
    amount: '+₦12,000',
    date: 'Today',
    icon: 'arrow-down-outline',
    color: 'text-green-500',
  },
  {
    id: '2',
    type: 'Withdraw',
    amount: '-₦5,000',
    date: 'Yesterday',
    icon: 'arrow-up-outline',
    color: 'text-red-500',
  },
  {
    id: '3',
    type: 'Invoice Paid',
    amount: '+₦20,000',
    date: '2 days ago',
    icon: 'document-attach-outline',
    color: 'text-blue-500',
  },
];

const TransactionHistory = () => {
  return (
    <View className="mt-8 px-2">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-clashmedium text-gray-800">Recent Transactions</Text>
        <TouchableOpacity onPress={() => router.push('/history')}>
          <Text className="items-center gap-2 font-jarkatamedium text-sm text-primary-600">
            <Text>See all </Text>
            <Ionicons name="arrow-forward" />{' '}
          </Text>
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
              <Text className="font-jarkatamedium text-gray-900 text-sm">{item.type}</Text>
              <Text className="text-xs text-gray-400">{item.date}</Text>
            </View>
            <Text className={`font-jarkatamedium text-xs  ${item.color}`}>{item.amount}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center py-8">
            <Text className="text-gray-400">No transactions yet</Text>
          </View>
        }
        scrollEnabled={false}
      />
    </View>
  );
};

export default TransactionHistory;
