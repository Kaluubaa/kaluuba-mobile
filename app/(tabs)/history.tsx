import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '~/components/reusbales/Container';
import Header from '~/components/reusbales/Header';

const allTransactions: {
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

const TransactionHistoryPage = () => {
  return (
    <Container className="">
      <Header title="History" />

      <FlatList
        data={allTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center border-b border-gray-100  py-4">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Ionicons name={item.icon as any} size={18} className={item.color} />
            </View>
            <View className="flex-1">
              <Text className="font-jarkatamedium text-sm text-gray-900">{item.type}</Text>
              <Text className="text-xs text-gray-400">{item.date}</Text>
            </View>
            <Text className={`font-jarkatamedium text-sm ${item.color}`}>{item.amount}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center py-8">
            <Text className="text-gray-400">No transactions yet.</Text>
          </View>
        }
      />
    </Container>
  );
};

export default TransactionHistoryPage;
