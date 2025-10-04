import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ITransaction } from '~/types/transactions.types';
import { formatTransactionDate } from '~/utils/format-date';
import TransactionItem from '../transactions/TransactionItem';

type Prop = {
  transactions: ITransaction[];
};
const TransactionHistory = ({ transactions }: Prop) => {
  // console.log(transactions);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-primary-100 text-primary-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'failed':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  return (
    <View className="mt-8 flex-1 px-2">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="font-jarkatabold tracking-wider text-gray-800">Recent Transactions</Text>
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
        renderItem={({ item }) => <TransactionItem transaction={item} />}
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
