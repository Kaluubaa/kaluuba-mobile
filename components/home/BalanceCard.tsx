import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { images } from '~/constants/images';
import { router } from 'expo-router';

type Props = {};

const BalanceCard = (props: Props) => {
  const actions = [
    // {
    //   title: 'Invoice',
    //   icon: 'document-attach-outline',
    //   onPress: () => router.push('/invoices/create'),
    // },
    {
      title: 'Kaluuba Scan',
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

  const [showBalance, setShowBalance] = React.useState<boolean>(false);
  return (
    <View className="flex min-h-[150px] w-full items-center rounded-xl bg-white px-4 py-8">
      <View>
        <View className="w-full flex-row items-center gap-3 rounded-full bg-gray-100 px-3 py-1.5 ">
          <View className="size-5 overflow-hidden rounded-full bg-black">
            <Image source={images.usdc} className="h-full w-full" />
          </View>
          <Text className=" font-jarkatamedium text-sm text-gray-600">USDC</Text>

          <Ionicons name="chevron-down" size={15} color={'#6B7280'} />
        </View>
      </View>

      <View className="mt-6 flex-row items-center gap-2">
        <Text className="font-clashmedium text-[26px] text-gray-900">
          {showBalance ? '$ 200.00' : '$ ****'}
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
          <Pressable className="items-center" onPress={action.onPress} key={index}>
            <View className="shadow-xs h-[40px] w-[40px] items-center justify-center rounded-full border border-gray-200 bg-white">
              <Ionicons name={action.icon as keyof typeof Ionicons.glyphMap} size={15} />
            </View>
            <Text className="mt-2 text-center font-jarkataregular text-xs text-gray-800">
              {action.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default BalanceCard;
