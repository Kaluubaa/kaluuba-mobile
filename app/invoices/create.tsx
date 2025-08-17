import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateInvoice } from '~/components/invoice/CreateInvoice';
import { Container } from '~/components/reusbales/Container';

export default function CreateInvoiceScreen() {
  return (
    <Container className="flex-1 bg-white px-2">
      <View className="flex gap-4">
        <Ionicons name="chevron-back" size={20} />
        <Text className="font-clashmedium text-lg tracking-wider text-gray-600">Create New Invoice</Text>
      </View>
      <CreateInvoice />
    </Container>
  );
}
