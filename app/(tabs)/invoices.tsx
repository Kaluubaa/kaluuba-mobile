import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { InvoiceList } from '~/components/invoice/InvoiceList';
import { Container } from '~/components/reusbales/Container';
import { useGetUserInvoices } from '~/hooks/use-invoice';

const InvoicesPage = () => {
  const { data } = useGetUserInvoices();

  const invoices = data?.data.invoices;

  console.log(invoices);
  return (
    <Container className="py-4 px-2">
      <View className="flex gap-4">
        <Ionicons name='chevron-back' size={20} />
        <Text className="font-clashmedium text-gray-600 text-lg tracking-wider">Invoices</Text>
      </View>
      <InvoiceList invoices={invoices} />;
    </Container>
  );
};

export default InvoicesPage;
