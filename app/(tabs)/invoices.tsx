import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { InvoiceList } from '~/components/invoice/InvoiceList';
import { Container } from '~/components/reusbales/Container';
import { useGetUserInvoices } from '~/hooks/use-invoice';

const InvoicesPage = () => {
  const { data } = useGetUserInvoices();

  const tabs = ['invoices', 'customers'];

  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const invoices = data?.data.invoices;

  console.log(invoices);
  return (
    <Container className="flex-1 px-2 py-4">
      <View className="flex gap-4">
        <Ionicons name="chevron-back" size={20} />
        <Text className="font-clashmedium text-lg tracking-wider text-gray-600">Invoices</Text>
      </View>

      <View className="mb-2 mt-4 ">
        <View className="flex-row items-center justify-between rounded-lg bg-gray-200 px-4 py-2">
          {tabs.map((tab) => (
            <TouchableOpacity onPress={() => handleTabChange(tab)} key={tab} className={`w-[45%] rounded ${activeTab === tab ? 'bg-white font-jarkatasemibold' : ''}  px-2 py-1`}>
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
