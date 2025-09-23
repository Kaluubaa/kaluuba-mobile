import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {};

const BalanceCard = (props: Props) => {
  const [showBalance, setShowBalance] = React.useState<boolean>(false);
  return (
    <View className="min-h-[150px] w-full rounded-xl bg-black/80 p-4">
      <View className="flex-row items-center gap-2">
        <Text className="font-jarkataregular text-sm text-gray-400">Account Balance</Text>
        <Pressable onPress={() => setShowBalance(!showBalance)} className="p-2">
          <Ionicons
            name={showBalance ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#9ca3af"
          />
        </Pressable>
      </View>
      <View className="mt-1 flex-row items-center gap-2">
        <Text className="font-clashmedium text-[26px] text-gray-100">
          {showBalance ? '$ 00.00' : '$ ****'}
        </Text>
        <Text className="font-jarkataregular  text-gray-100"> usdc</Text>
      </View>

      <View className="mt-6 flex-row items-center justify-between">
        <View>
          <Text className="font-jarkataregular text-xs text-gray-400">Local Balance (NGN)</Text>
          <Text className="font-jarkataregular text-sm text-white">
            {showBalance ? '₦ 00.00' : '₦ ****'}
          </Text>
        </View>
        <View>
          <Text className="font-jarkataregular text-xs text-gray-400">Exchange Rate</Text>
          <Text className="font-jarkataregular text-sm text-white">₦800/$1</Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
