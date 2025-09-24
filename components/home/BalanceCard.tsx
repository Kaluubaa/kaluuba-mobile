import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { images } from '~/constants/images';
import { router } from 'expo-router';
import { Balance } from '~/types/user';
import { SheetManager } from 'react-native-actions-sheet';

type Props = {
  balances: Balance[];
  loadingBalance: boolean;
  openRecieveSheet: any;
};

const BalanceCard = ({ balances, loadingBalance, openRecieveSheet }: Props) => {
  const actions = [
    // {
    //   title: 'Invoice',
    //   icon: 'document-attach-outline',
    //   onPress: () => router.push('/invoices/create'),
    // },
    {
      title: 'Kaluuba Scan',
      icon: 'scan-outline',
      onPress: () => router.push('/scan'),
    },
    {
      title: 'Recieve',
      icon: 'arrow-down-outline',
      onPress: () => router.push('/recieve'),
    },
    {
      title: 'Send',
      icon: 'arrow-up-outline',
      onPress: () => SheetManager.show('send-type-sheet'),
    },
  ];

  const usdc = balances && balances[0];

  const [showBalance, setShowBalance] = React.useState<boolean>(false);

  return (
    <View className="bg--500 relative flex min-h-[150px] w-full items-center rounded-xl bg-white py-6">
      <Image
        source={images.pattern}
        className="absolute inset-0 h-[150px] w-full "
        style={{ resizeMode: 'cover' }}
      />
      <View>
        <View className="w-full flex-row items-center gap-3 rounded-full bg-gray-200 px-3 py-1.5 ">
          <View className="size-5 overflow-hidden rounded-full bg-black">
            <Image source={images.usdc} className="h-full w-full" />
          </View>
          <Text className=" font-jarkatamedium text-sm text-gray-600">USDC</Text>

          <Ionicons name="chevron-down" size={15} color={'#6B7280'} />
        </View>
      </View>

      <View className="mt-6 flex-row items-center gap-2">
        <Text className="font-clashmedium text-[26px] tracking-widest text-gray-900">
          {loadingBalance ? (
            <View className="h-7 w-24 animate-pulse rounded bg-gray-300" />
          ) : showBalance ? (
            `$ ${Number(usdc?.formatted ?? 0).toFixed(2)}`
          ) : (
            '$ *****'
          )}
        </Text>
        <Pressable onPress={() => setShowBalance(!showBalance)} className="p-2">
          <Ionicons
            name={showBalance ? 'eye-outline' : 'eye-off-outline'}
            size={16}
            color="#9ca3af"
          />
        </Pressable>
      </View>

      <View className="mt-8 flex-row gap-10 px-3">
        {actions.map((action, index) => (
          <TouchableOpacity className="items-center" onPress={action.onPress} key={index}>
            <View className="shadow-xs h-[45px] w-[45px] items-center justify-center rounded-full border border-gray-200 bg-white">
              <Ionicons name={action.icon as keyof typeof Ionicons.glyphMap} size={15} />
            </View>
            <Text className="mt-2 text-center font-jarkataregular text-xs text-gray-800">
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BalanceCard;
