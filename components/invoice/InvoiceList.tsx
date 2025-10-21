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
    case 'overdue':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};


export const InvoiceList = ({ invoices }: { invoices: any[] }) => {
  console.log('Invoices:', invoices);
  
  if (!invoices || invoices.length === 0) {
    return (
      <View className="flex-1">
        <View className="flex-1 items-center justify-center gap-4 pt-52">
          <Ionicons name="document-text" size={24} color="#9ca3af" />
          <Text className="font-jarkatamedium text-gray-400">You have not created any invoice</Text>
        </View>
        <View className="px-4 pb-4">
          <Button
            size="sm"
            className="px-6 py-2.5"
            textClassName="flex-row"
            onPress={() => router.push('/invoices/create')}>
            Create invoice
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="py-2">
          {invoices.map((invoice) => (
            <Pressable
              key={invoice.id}
              className="mb-4 overflow-hidden rounded-xl bg-white p-4"
              onPress={() => router.push(`/invoices/details/${invoice.id}`)}
            >
              {/* Header */}
              <View className="mb-3 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-jarkatasemibold text-lg text-gray-900" numberOfLines={1}>
                    {invoice.title}
                  </Text>
                  <Text className="font-jarkataregular text-sm text-gray-500">
                    {invoice.invoiceNumber}
                  </Text>
                </View>
                <View className={`rounded-full px-3 py-1 ${getStatusColor(invoice.status)}`}>
                  <Text className="font-jarkatamedium text-xs capitalize">{invoice.status}</Text>
                </View>
              </View>

              {/* Client Info */}
              <View className="mb-3 flex-row items-center">
                <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                  <Text className="font-jarkatabold text-xs text-primary-600">
                    {invoice.client?.clientIdentifier?.charAt(0).toUpperCase() || 'C'}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="font-jarkatamedium text-sm text-gray-800" numberOfLines={1}>
                    {invoice.client?.clientIdentifier}
                  </Text>
                </View>
              </View>

              {/* Amount and Date */}
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="font-jarkatabold text-lg text-gray-900">
                    {invoice.currency} {parseFloat(invoice.totalAmount).toFixed(2)}
                  </Text>
                  <Text className="font-jarkataregular text-xs text-gray-500">
                    Due {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="font-jarkataregular text-xs text-gray-500">
                    Created {format(new Date(invoice.createdAt), 'MMM dd')}
                  </Text>
                  <View className="mt-1 flex-row items-center">
                    <Ionicons name="chevron-forward" size={14} color="#9ca3af" />
                  </View>
                </View>
              </View>

              {/* Invoice Type Badge */}
              <View className="mt-3 flex-row items-center">
                <View className="rounded-full bg-gray-100 px-2 py-1">
                  <Text className="font-jarkataregular text-xs text-gray-600 capitalize">
                    {invoice.invoiceType?.replace('_', '-')}
                  </Text>
                </View>
                {invoice.recurrenceInterval && (
                  <View className="ml-2 rounded-full bg-blue-100 px-2 py-1">
                    <Text className="font-jarkataregular text-xs text-blue-600 capitalize">
                      {invoice.recurrenceInterval}
                    </Text>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      
      {/* Create Invoice Button - Always visible */}
      <View className=" pb-4">
        <Button
          size="sm"
          className="px-6 py-3"
          textClassName="flex-row"
          onPress={() => router.push('/invoices/create')}>
          Create invoice
        </Button>
      </View>
    </View>
  );
};
