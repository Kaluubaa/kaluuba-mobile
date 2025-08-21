import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { router } from '~/.expo/types/router';
import Clients from '~/components/invoice/Clients';
import { InvoiceList } from '~/components/invoice/InvoiceList';
import { Button } from '~/components/reusbales/Button';
import { Container } from '~/components/reusbales/Container';
import Header from '~/components/reusbales/Header';
import { useGetClient, useGetUserInvoices } from '~/hooks/use-invoice';

const InvoicesPage = () => {
  const { data } = useGetUserInvoices();
  const { data: clients } = useGetClient();

  const tabs = ['invoices', 'clients'];

  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const invoices = data?.data.invoices;
  const allClients = clients?.data?.clients;

  console.log(clients);
  return (
    <Container className="flex-1 px-2">
      <View className="flex-row justify-between">
        <Header title="Invoicing" />

        <View>
          {/* <Pressable
            className="px-2 h-[20px]"
            onPress={() => router.push('/invoices/create-client')}>
            Add Client
          </Pressable> */}
        </View>
      </View>

      <View className="mb-2 mt-4 ">
        <View className="flex-row items-center justify-between rounded-lg bg-gray-200 px-4 py-2">
          {tabs.map((tab) => (
            <TouchableOpacity
              onPress={() => handleTabChange(tab)}
              key={tab}
              className={`w-[45%] rounded ${activeTab === tab ? 'bg-white font-jarkatasemibold' : ''}  px-2 py-1`}>
              <Text className="text-center font-jarkataregular text-sm text-gray-600">
                {' '}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {activeTab === 'invoices' && (
        <View className="flex-1 py-4">
          <InvoiceList invoices={invoices} />
        </View>
      )}
      {activeTab === 'clients' && (
        <View className="flex-1 py-4">
          <Clients clients={allClients} />
          {/* <Text className="text-gray-500">Clients will be implemented soon.</Text> */}
        </View>
      )}

      {/* Uncomment this when the customers tab is implemented */}
      {/* {activeTab === 'customers' && (
        <View className="flex-1">
          <CustomerList customers={customers} />
        </View>
      )} */}
      {/* <InvoiceList invoices={invoices} />; */}
    </Container>
  );
};

export default InvoicesPage;
