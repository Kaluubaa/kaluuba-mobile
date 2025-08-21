import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Linking } from 'react-native';
import { ITransaction } from '~/types/transactions.types';
import { formatTransactionDate } from '~/utils/format-date';

interface TransactionItemProps {
  transaction: ITransaction;
  onPress?: () => void;
}

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

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  return (
    <TouchableOpacity
      className="relative w-full flex-row items-center border-b border-gray-200 py-4"
      onPress={onPress}
    >
      <View
        className={`mr-3 h-8 w-8 items-center justify-center rounded-full ${
          transaction.type === 'outgoing' ? 'bg-primary-100' : 'bg-primary-100'
        }`}
      >
        <Ionicons
          name={transaction.type === 'outgoing' ? 'arrow-up' : 'arrow-down'}
          size={16}
          color={transaction.type === 'outgoing' ? '#167D7F' : '#167D7F'}
        />
      </View>
      <View className="flex-1 gap-1">
        <Text className="font-jarkatamedium text-sm text-gray-700">
          {transaction.type === 'outgoing' ? 'Sent ' : 'Received '}
          <Text className="text-black">
            {transaction.amount} {transaction.tokenSymbol}
          </Text>{' '}
          {transaction.type === 'outgoing' ? 'to ' : 'from '} @{transaction.counterparty.username}
        </Text>
        <Text className="font-jarkataregular text-xs text-gray-500">
          {transaction.status === 'pending' || transaction.status === 'failed'
            ? `Pending since ${formatTransactionDate(transaction.createdAt, 'relative')}`
            : formatTransactionDate(transaction.confirmedAt, 'relative')}
        </Text>
        {/* {transaction.explorerUrl && (
          <TouchableOpacity onPress={() => Linking.openURL(transaction.explorerUrl)}>
            <Text className="font-jarkataregular text-sm text-blue-500">
              View on Explorer
            </Text>
          </TouchableOpacity>
        )} */}
        <View className="absolute right-0">
          <Text
            className={`rounded-full px-2 py-1 font-jarkataregular text-xs ${getStatusStyles(
              transaction.status
            )}`}
          >
            {transaction.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;