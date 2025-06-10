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
    <Container className="py-4">
      <View className="flex-row justify-between mb-6">
        <View className="flex-row items-center gap-2">
          <View className="h-12 w-12 rounded-full bg-gray-300"> </View>
        </View>
          <Text className="font-clashmedium text-lg text-gray-600">Invoices</Text>

        <View className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600">
          <Text className="font-clashmedium text-sm text-white">K</Text>
        </View>
      </View>
      <InvoiceList invoices={invoices} />;
    </Container>
  );
};

export default InvoicesPage;
