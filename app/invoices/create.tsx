import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateInvoice } from '~/components/invoice/CreateInvoice';
import { Container } from '~/components/reusbales/Container';

export default function CreateInvoiceScreen() {
  return (
    <Container className="flex-1 bg-white px-2">
      <View className="flex gap-4">
        <TouchableOpacity onPress={() => router.back()} className='w-1/3'>

        <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>
        <Text className="font-clashmedium text-lg tracking-wider text-gray-600">Create New Invoice</Text>
      </View>
      <CreateInvoice />
    </Container>
  );
}
