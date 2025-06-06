import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateInvoice } from '~/components/invoice/CreateInvoice';

export default function CreateInvoiceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <CreateInvoice />
    </SafeAreaView>
  );
} 