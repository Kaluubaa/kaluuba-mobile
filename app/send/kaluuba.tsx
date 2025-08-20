import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Container } from '~/components/reusbales/Container';
import Header from '~/components/reusbales/Header';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Button } from '~/components/reusbales/Button';

const Kaluuba = () => {
  const [kaluubaName, setKaluubaName] = useState('');

  const handleScanPress = () => {
    router.push('/scan'); // Navigate to your scan page
  };
  return (
    <Container className="flex-1 bg-gray-50 px-2">
      <Header title="Send to kaluuba Wallet" />

      <View className="flex-1">
        <View className="mt-8">
          {/* <Text className="mb-2 font-jarkataregular text-gray-600">Enter Kaluuba Name</Text> */}
          <View className="relative flex-row items-center rounded-xl border border-gray-200  px-3">
            <TextInput
              className="flex-1 py-4 font-jarkatamedium text-base text-gray-800"
              placeholder="Enter Kaluuba name"
              value={kaluubaName}
              onChangeText={setKaluubaName}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={handleScanPress} className="ml-2 p-2">
              <Ionicons name="qr-code-outline" size={24} color="#167D7F" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-2 px-1 font-jarkataregular text-sm text-gray-600">
            Account Email (Auto-generated)
          </Text>
          <View className="relative flex-row items-center rounded-xl border border-gray-200 bg-gray-200  px-3">
            <TextInput
              className="flex-1 py-4 font-jarkatamedium text-base text-gray-800"
              placeholder="Account email"
              value={''}
              onChangeText={setKaluubaName}
              autoCapitalize="none"
            />
          </View>
        </View>
      </View>

      <Button className="mb-6 h-[50px] w-full">Continue</Button>
    </Container>
  );
};

export default Kaluuba;
