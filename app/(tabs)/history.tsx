import React from 'react';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Container } from '~/components/reusbales/Container';

const allTransactions = [
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
  {
    id: '4',
    type: 'Transfer',
    amount: '-₦8,500',
    date: '3 days ago',
    icon: 'swap-horizontal-outline',
    color: 'text-orange-500',
  },
  {
    id: '5',
    type: 'Bill Payment',
    amount: '-₦15,000',
    date: '1 week ago',
    icon: 'flash-outline',
    color: 'text-red-500',
  },
];

const TransactionHistoryPage = () => {
  return (
    <Container className="py-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-5 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="font-clashmedium text-xl text-gray-900">All Transactions</Text>
        <View className="w-6" />
      </View>

      <FlatList
        data={allTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center border-b border-gray-100  py-4">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Ionicons name={item.icon as any} size={18} className={item.color} />
            </View>
            <View className="flex-1">
              <Text className="font-jarkatamedium text-gray-900 text-sm">{item.type}</Text>
              <Text className="text-xs text-gray-400">{item.date}</Text>
            </View>
            <Text className={`font-jarkatamedium text-sm ${item.color}`}>{item.amount}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center py-8">
            <Text className="text-gray-400">No transactions yet</Text>
          </View>
        }
      />
    </Container>
  );
};

export default TransactionHistoryPage;