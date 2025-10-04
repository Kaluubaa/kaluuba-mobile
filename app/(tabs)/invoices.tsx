import React from 'react';
import { Text, TouchableOpacity, View, ScrollView, RefreshControl } from 'react-native';
import Clients from '~/components/invoice/Clients';
import { InvoiceList } from '~/components/invoice/InvoiceList';
import { Container } from '~/components/reusbales/Container';
import Header from '~/components/reusbales/Header';
import { useGetClient, useGetUserInvoices } from '~/hooks/use-invoice';
import { useRefresh } from '~/hooks/use-refresh';

const InvoicesPage = () => {
  const { data, refetch: refetchInvoices } = useGetUserInvoices();
  const { data: clients, refetch: refetchClients } = useGetClient();

  const tabs = ['invoices', 'clients'];

  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Use the custom refresh hook
  const { refreshing, onRefresh } = useRefresh([refetchInvoices, refetchClients]);

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
        <ScrollView 
          className="flex-1"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6366f1"
              colors={['#6366f1']}
              title="Pull to refresh"
              titleColor="#6b7280"
            />
          }>
          <View className="flex-1 py-4">
            <InvoiceList invoices={invoices} />
          </View>
        </ScrollView>
      )}
      
      {activeTab === 'clients' && (
        <View className="flex-1">
          <Clients 
            clients={allClients} 
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        </View>
      )}
    </Container>
  );
};

export default InvoicesPage;
