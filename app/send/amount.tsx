import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Header from '~/components/reusbales/Header';
import { Container } from '~/components/reusbales/Container';
import { NumericKeypad } from '~/components/reusbales/NumericKeypad';
import { useLocalSearchParams } from 'expo-router';
import { useGetUserBalance } from '~/hooks/use-transactions';
import { Button } from '~/components/reusbales/Button';

const Amount = () => {
  const { kaluubaName, coin } = useLocalSearchParams();
  const [amount, setAmount] = useState('0.00');
  const { data: balance } = useGetUserBalance();

  const handleKeypadPress = (key: string) => {
    if (key === '<') {
      setAmount((prev) => {
        const num = parseFloat(prev.replace('.', '')) / 100;
        const newNum = Math.floor(num * 10) / 100;
        return newNum.toFixed(2);
      });
    } else if (key === '.') {
      return;
    } else {
      setAmount((prev) => {
        const num = parseFloat(prev.replace('.', '')) / 100;
        const newNum = num * 10 + parseInt(key) / 100;
        return newNum.toFixed(2);
      });
    }
  };
  return (
    <Container className="flex-1 bg-gray-50 px-2">
      <Header title="Enter Amount" />
      <View className="flex-1 items-center justify-center">
        <View className="mb-4 rounded-xl border border-primary-200 bg-primary-100 px-6 py-2 text-sm">
          <Text className="font-jarkataregular text-gray-600 ">Recipient - @{kaluubaName}</Text>
        </View>
        <Text className="mb-6 mt-4 font-clashmedium text-4xl tracking-wider">
          {amount || '0.00'} {coin}
        </Text>

        <Text className="font-jarkatasemibold">Your Balance: 10.00</Text>
      </View>
      <View className="mt-auto">
        <View className="mt-10 items-center">
          <NumericKeypad onKeyPress={handleKeypadPress} />
        </View>

        <Button className="my-6 h-[50px]" disabled={amount === '0.00'}>
          Continue
        </Button>
      </View>
    </Container>
  );
};

export default Amount;
