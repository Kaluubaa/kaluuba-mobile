import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Invoice } from '~/types/invoice.t';
import { router } from 'expo-router';

// Mock data
const mockInvoices: Invoice[] = [
  {
    id: '1',
    title: 'Website Development',
    currency: 'USDC',
    status: 'paid',
    createdAt: new Date('2024-03-15'),
    items: [
      {
        description: 'Frontend Development',
        amount: 1500.00,
        quantity: 1
      },
      {
        description: 'Backend Development',
        amount: 2000.00,
        quantity: 1
      }
    ]
  },
  {
    id: '2',
    title: 'Mobile App Development',
    currency: 'USDC',
    status: 'pending',
    createdAt: new Date('2024-03-10'),
    items: [
      {
        description: 'UI/UX Design',
        amount: 1200.00,
        quantity: 1
      },
      {
        description: 'Development',
        amount: 3000.00,
        quantity: 1
      }
    ]
  },
  {
    id: '3',
    title: 'Consulting Services',
    currency: 'USDC',
    status: 'draft',
    createdAt: new Date('2024-03-05'),
    items: [
      {
        description: 'Technical Consulting',
        amount: 500.00,
        quantity: 4
      }
    ]
  }
];

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
  return items.reduce((total, item) => total + (item.amount * item.quantity), 0);
};

export const InvoiceList = () => {
  return (
    <ScrollView className="flex-1 ">
      <View className="">
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="font-clashmedium text-xl text-gray-900">Invoices</Text>
          <Pressable 
            onPress={() => router.push('/invoices/create')}
            className="flex-row items-center rounded-full bg-primary-500 px-4 py-2">
            <Ionicons name="add" size={18} color="white" />
            <Text className="ml-2 font-jarkatamedium text-white text-sm">New Invoice</Text>
          </Pressable>
        </View>

        {mockInvoices.map((invoice) => (
          <Pressable
            key={invoice.id}
            className="mb-4 overflow-hidden rounded-xl bg-white p-4 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-jarkatasemibold text-gray-900">{invoice.title}</Text>
                <Text className="font-jarkataregular text-sm text-gray-500">
                  {format(invoice.createdAt, 'MMM dd, yyyy')}
                </Text>
              </View>
              <View className="items-end">
                <Text className="font-clashmedium text-sm text-gray-900">
                  {invoice.currency} {getTotalAmount(invoice.items).toFixed(2)}
                </Text>
                <View className={`mt-1 rounded-full px-3 py-1 ${getStatusColor(invoice.status)}`}>
                  <Text className="font-jarkatamedium text-xs capitalize">{invoice.status}</Text>
                </View>
              </View>
            </View>

            <View className="mt-4 border-t border-gray-100 pt-4">
              {invoice.items.map((item, index) => (
                <View key={index} className="mb-2 flex-row justify-between">
                  <Text className="font-jarkataregular text-sm text-gray-600">
                    {item.description}
                  </Text>
                  <Text className="font-jarkatamedium text-sm text-gray-900">
                    {invoice.currency} {(item.amount * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}; 