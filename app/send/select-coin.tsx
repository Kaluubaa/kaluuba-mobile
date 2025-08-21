import { View, Text, Image } from 'react-native';
import { Container } from '~/components/reusbales/Container';
import React from 'react';
import Header from '~/components/reusbales/Header';
import { symbol } from 'zod';
import { TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const SelectCoin = () => {
  const { kaluubaName } = useLocalSearchParams();
  const coins = [
    {
      name: 'USDC',
      symbol: 'USDC',
      logo: 'https://static.vecteezy.com/system/resources/previews/024/093/471/non_2x/usd-coin-usdc-glass-crypto-coin-3d-illustration-free-png.png',
      decimals: 6,
    },
    {
      name: 'cNGN',
      symbol: 'cNGN',
      logo: 'https://static.vecteezy.com/system/resources/previews/024/093/471/non_2x/usd-coin-usdc-glass-crypto-coin-3d-illustration-free-png.png',
      decimals: 6,
    },
  ];

  //   console.log(kaluubaName)
  return (
    <Container className="flex-1 bg-gray-50 px-2">
      <Header title="Send to kaluuba Wallet" />
      <View className="flex-1 ">
        <Text className="font-jarkataregular  text-gray-600">Select the coin you want to send</Text>

        <View className="mt-10 gap-6">
          {coins.map((coin) => (
            <TouchableOpacity
              key={coin.symbol}
              onPress={() =>
                router.push({ pathname: '/send/amount', params: { coin: coin.name, kaluubaName } })
              }
              className="flex-row items-center rounded-lg border border-gray-200 px-4 py-4">
              <Image source={{ uri: coin.logo }} className="h-8 w-8 rounded-full" />
              <View className="ml-2">
                <Text className="font-jarkatasemibold text-gray-800">{coin.name}</Text>
                {/* <Text className="font-jarkataregular text-gray-600">{coin.symbol}</Text> */}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Container>
  );
};

export default SelectCoin;
