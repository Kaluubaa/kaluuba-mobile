import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

type Props = {}

const BalanceCard = (props: Props) => {
    const [showBalance, setShowBalance] = React.useState<boolean>(false)
  return (
    <View className='w-full p-4 rounded-xl min-h-[150px] bg-black/80'>
      <View className='flex-row gap-2 items-center'>
        <Text className='text-gray-400 text-sm font'>Account Balance</Text>
        <Pressable onPress={() => setShowBalance(!showBalance)} className='p-2'>
          <Ionicons 
            name={showBalance ? "eye-outline" : "eye-off-outline"} 
            size={20} 
            color="#9ca3af"
          />
        </Pressable>
      </View>
      <View className='flex-row gap-2 items-center mt-1'>
        <Text className='text-gray-100 text-[26px] font-clashmedium'>
          {showBalance ? '$ 112.00' : '$ ****'}
        </Text>
        <Text className='text-gray-100  font-jarkataregular'> usdc</Text>
      </View>

<View className='mt-6 flex-row justify-between items-center'>
  <View>
    <Text className='text-gray-400 text-xs font-jarkataregular'>
      Local Balance (NGN)
    </Text>
    <Text className='text-white text-sm font-jarkataregular'>
      {showBalance ? '₦ 89,600.00' : '₦ ****'}
    </Text>
  </View>
  <View>
    <Text className='text-gray-400 text-xs font-jarkataregular'>
      Exchange Rate
    </Text>
    <Text className='text-white text-sm font-jarkataregular'>
      ₦800/$1
    </Text>
  </View>
</View>

    </View>
  )
}

export default BalanceCard