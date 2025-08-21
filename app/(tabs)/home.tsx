import { View, Text, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useCallback, useRef } from 'react';

import { Container } from '~/components/reusbales/Container';
import BalanceCard from '~/components/home/BalanceCard';
import { Ionicons } from '@expo/vector-icons';
import TransactionHistory from '~/components/home/TransactionHistory';
import SwiperAds from '~/components/home/SwipperAds';
import { router } from 'expo-router';
import { useAuth } from '~/context/AuthContext';
import { images } from '~/constants/images';
import Recommended from '~/components/home/Recommended';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useGetTransactionHistory, useGetUserBalance } from '~/hooks/use-transactions';
import ReceiveSheet from '~/components/bottom-sheets/RecieveSheet';

const Home = () => {
  const { user } = useAuth();
  const actions = [
    {
      title: 'Invoice',
      icon: 'document-attach-outline',
      onPress: () => router.push('/invoices/create'),
    },
    {
      title: 'Scan',
      icon: 'scan-outline',
      onPress: () => console.log('Scan pressed'),
    },
    {
      title: 'Recieve',
      icon: 'arrow-down-outline',
      onPress: () => console.log('Add pressed'),
    },
    {
      title: 'Withdraw',
      icon: 'arrow-up-outline',
      onPress: () => console.log('Withdraw pressed'),
    },
  ];

  const { data, isLoading } = useGetUserBalance();
  const { data: trxhistory, isLoading: isLoadingTrx } = useGetTransactionHistory();

  // console.log(trxhistory)

  const transactions = trxhistory?.data?.transactions || [];
  const balances = data?.data?.balances?.balances;

  console.log('hmm', balances);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['30%', '70%'];
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Container className="flex-1 px-2 py-6 ">
        <View className="flex-1 gap-6">
          <View className="mb-4 flex-row justify-between">
            <View className="flex-row items-center gap-2">
              <View className="h-12 w-12 overflow-hidden rounded-full  border border-primary-500 bg-primary-300">
                <Image source={images.user} className="h-full w-full" />
              </View>
              <View className="gap-0.5">
                <Text className="font-jarkatasemibold text-primary-600">@{user?.username}</Text>
                <Text className="font-jarkatamedium text-xs text-gray-600">
                  Money is energy, direct it with purpose
                </Text>
              </View>
            </View>

            <View className="relative flex size-10 items-center justify-center rounded-full bg-primary-600">
              <Ionicons name="notifications-outline" size={20} color={'#ffffff'} />
              <View className="absolute right-0 top-1 size-3 rounded-full bg-red-500" />
            </View>
          </View>
          <BalanceCard
            openRecieveSheet={bottomSheetRef.current?.expand}
            balances={balances}
            loadingBalance={isLoading}
          />

          <Recommended />

          {/* <Pressable
          onPress={() => bottomSheetRef.current?.expand()}
          className="mb-4 items-center justify-center rounded bg-primary-600 py-2">
          <Text className="font-jarkatamedium text-white">Open Bottom Sheet</Text>
        </Pressable> */}
          {/* <View className="flex-row justify-between px-3">
          {actions.map((action, index) => (
            <Pressable onPress={action.onPress} key={index}>
              <View className="h-[48px] w-[48px] items-center justify-center rounded-full bg-white">
                <Ionicons name={action.icon as keyof typeof Ionicons.glyphMap} size={18} />
              </View>
              <Text className="mt-2 text-center font-jarkataregular text-sm text-gray-800">
                {action.title}
              </Text>
            </Pressable>
          ))}
        </View> */}
          {/* <SwiperAds /> */}

          {isLoadingTrx ? (
            <ActivityIndicator />
          ) : (
            <TransactionHistory transactions={transactions} />
          )}
        </View>
      </Container>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        bottomInset={0}
        backgroundStyle={{
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 54,
          borderTopRightRadius: 54,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 12,
        }}
        // style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
      >
        <ReceiveSheet
          usdcAddress={(balances && balances[0]?.tokenAddress) || ''}
          onClose={() => bottomSheetRef.current?.close()}
        />
      </BottomSheet>
    </View>
  );
};

export default Home;
