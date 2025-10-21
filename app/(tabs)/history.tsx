import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable, ScrollView, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from '~/components/reusbales/Container';
import Header from '~/components/reusbales/Header';
import TransactionItem from '~/components/transactions/TransactionItem';
import { useGetTransactionHistory } from '~/hooks/use-transactions';

const TransactionHistoryPage = () => {
  const tabs = ['All', 'Incoming', 'Outgoing'];

  const { data: trxhistory, isLoading: isLoadingTrx } = useGetTransactionHistory();

  const transactions = trxhistory?.data?.transactions || [];

  // Handle back button to close/minimize app instead of going to login
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  return (
    <Container className="px-2">
      <Header title="History" />

      <View className="flex-row py-4">
        <View className="flex-row gap-4">
          {tabs.map((tab) => (
            <Pressable key={tab} className="rounded-2xl bg-gray-200 px-6 py-1">
              <Text className="font-jarkataregular text-xs text-gray-700">{tab}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View className="mt-6 flex-1">
        {isLoadingTrx ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TransactionItem transaction={item} />}
            ListEmptyComponent={
              <View className="items-center py-8">
                <Text className="text-gray-400">No transactions yet.</Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Container>
  );
};

export default TransactionHistoryPage;
