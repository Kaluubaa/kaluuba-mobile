import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

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
    case 'completed':
      return 'text-green-600';
    case 'pending':
      return 'text-yellow-600';
    case 'failed':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to transaction receipt page with transaction details
      router.push({
        pathname: '/transaction-receipt',
        params: {
          amount: transaction.amount,
          currency: transaction.tokenSymbol,
          recipient: `@${transaction.counterparty.username}`,
          transactionId: transaction.transactionId,
          fee: '0.00', // You might want to add fee to transaction type
          timestamp: transaction.confirmedAt || transaction.createdAt,
          status: transaction.status,
          type: transaction.type,
          counterparty: transaction.counterparty.username,
        },
      });
    }
  };

  return (
    <TouchableOpacity
      className="relative w-full flex-row items-center  border-gray-200 py-4"
      onPress={handlePress}
    >
      <View
        className={`mr-3 h-8 w-8 items-center justify-center rounded-full ${
          transaction.type === 'outgoing' ? 'bg-primary-100' : 'bg-primary-100'
        }`}
      >
                 <Ionicons
                   name={transaction.type === 'outgoing' ? 'arrow-up' : 'arrow-down'}
                   size={16}
                   color={transaction.type === 'outgoing' ? '#306B4F' : '#306B4F'}
                 />
      </View>
      <View className="flex-1 gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-jarkatamedium text-sm text-gray-700 flex-1">
            {transaction.type === 'outgoing' ? 'Sent ' : 'Received '}
            {transaction.type === 'outgoing' ? 'to ' : 'from '} @{transaction.counterparty.username}
          </Text>
          <Text className="font-jarkatasemibold text-sm text-gray-600">
            {transaction.type === 'outgoing' ? '-' : '+'}${transaction.amount}
          </Text>
        </View>
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
        <View className="absolute right-0 bottom-0 flex-row items-center">
          <View className={`w-2 h-2 rounded-full mr-2 ${
            transaction.status === 'confirmed' || transaction.status === 'completed' ? 'bg-green-500' :
            transaction.status === 'pending' ? 'bg-yellow-500' :
            transaction.status === 'failed' ? 'bg-red-500' : 'bg-gray-500'
          }`} />
          <Text
            className={`font-jarkataregular text-xs ${getStatusStyles(
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