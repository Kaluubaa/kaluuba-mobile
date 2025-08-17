import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Invoice } from '~/types/invoice.t';
import { router } from 'expo-router';
import { Button } from '../reusbales/Button';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTotalAmount = (items: Invoice['items']) => {
  return items.reduce((total, item) => total + item.amount * item.quantity, 0);
};

export const InvoiceList = ({ invoices }: { invoices: Invoice[] }) => {
  console.log('listtttt', invoices);
  return (
    <ScrollView className="flex-1 ">
      <View className="flex-1 items-center justify-center gap-4 pt-52">
        <Ionicons name="document-text" size={24} color="#9ca3af" />
        <Text className="font-jarkatamedium text-gray-400">You have not created any invoice</Text>

        <Button size="sm" className="py-2.5 px-6" textClassName='flex-row ' onPress={() => router.push('/invoices/create')}>
          Create invoice
          {/* <Ionicons name="add" size={15} color="#9ca3af" /> */}
        </Button>
        {/* <Pressable 
            onPress={() => router.push('/invoices/create')}
            className="flex-row items-center rounded-lg bg-gray-800 px-4 py-2">
            <Ionicons name="add" size={18} color="white" />
            <Text className="ml-2 font-jarkatamedium text-white text-sm">New Invoice</Text>
          </Pressable> */}
      </View>
      <View className="flex-1 px-4">
        {/* {invoices?.map((invoice) => (
         <Pressable
         key={invoice?.id}
         className="mb-4 overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm"
         onPress={() => router.push(`/invoice/${invoice?.id}`)} // <-- Make card clickable
       >
         <View className="flex-row items-center justify-between">
           <View className='gap-2'>
             <Text className="font-jarkatasemibold text-gray-900">{invoice?.title}</Text>
             <Text className="font-jarkataregular text-sm text-gray-500">
               {format(invoice?.created_at || "", 'MMM dd, yyyy')}
             </Text>
           </View>
           <View className="items-end gap-2">
             <Text className="font-clashmedium text-sm text-gray-600">
               {invoice?.currency} {getTotalAmount(invoice?.items).toFixed(2)}
             </Text>
             <View className={`mt-1 rounded-full px-3 py-1 ${getStatusColor(invoice?.status || "pending")}`}>
               <Text className="font-jarkatamedium text-xs capitalize">{invoice?.status}</Text>
             </View>
           </View>
         </View>
         
       </Pressable>
        ))} */}
      </View>
    </ScrollView>
  );
};
