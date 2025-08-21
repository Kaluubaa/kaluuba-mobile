import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ITransaction } from '~/types/transactions.types';

type Prop = {
  transactions: ITransaction[];
}
const TransactionHistory = ({ transactions }: Prop) => {
  console.log(transactions)
  return (
    <View className="mt-8 px-2 flex-1">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-clashmedium text-gray-600 tracking-wider">Recent Transactions</Text>
        <TouchableOpacity onPress={() => router.push('/history')}>
          <View className="flex-row items-center gap-2">
            <Text className="font-jarkatamedium text-sm text-primary-600">See all</Text>
            <Ionicons name="chevron-forward" size={14} color="#116567" />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.transactionId}
        renderItem={({ item }) => (
          <View className="flex-row items-center border-b border-gray-100 py-3">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Ionicons name={`arrow-up`} size={18} className='' />
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
