import { View, Text, ScrollView, TouchableOpacity, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container } from '~/components/reusbales/Container';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '~/services/api';
import { Invoice } from '~/types/invoice.t';

export default function InvoiceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: invoice, isLoading } = useQuery<Invoice>({
    queryKey: ['invoice', id],
    queryFn: () => apiGet(`/invoices/${id}`),
  });

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Invoice #${invoice?.invoice_number}\nAmount: ₦${invoice?.amount}\nDue Date: ${new Date(invoice?.due_date || '').toLocaleDateString()}\n\nView invoice: https://kaluuba.vercel.app/invoice/${id}`,
        title: `Invoice #${invoice?.invoice_number}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Invoice Details */}
        <View className="px-4">
          <View className="rounded-xl bg-white p-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-jarkatasemibold text-gray-900">
                Invoice #{invoice?.invoice_number}
              </Text>
              <View className={`rounded-full px-3 py-1 ${
                invoice?.status === 'paid' ? 'bg-green-100' : 
                invoice?.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <Text className={`text-sm font-jarkatamedium ${
                  invoice?.status === 'paid' ? 'text-green-600' : 
                  invoice?.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {invoice?.status?.charAt(0).toUpperCase() + invoice?.status?.slice(1)}
                </Text>
              </View>
            </View>

            <View className="mt-4 space-y-4">
              <View>
                <Text className="text-sm font-jarkatamedium text-gray-500">Amount</Text>
                <Text className="text-2xl font-jarkatasemibold text-gray-900">
                  ₦{invoice?.amount?.toLocaleString()}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <View>
                  <Text className="text-sm font-jarkatamedium text-gray-500">Due Date</Text>
                  <Text className="font-jarkatamedium text-gray-900">
                    {new Date(invoice?.due_date || '').toLocaleDateString()}
                  </Text>
                </View>
                <View>
                  <Text className="text-sm font-jarkatamedium text-gray-500">Created</Text>
                  <Text className="font-jarkatamedium text-gray-900">
                    {new Date(invoice?.created_at || '').toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Client Information */}
          <View className="mt-4 rounded-xl bg-white p-4">
            <Text className="text-lg font-jarkatasemibold text-gray-900 mb-4">Client Information</Text>
            <View className="space-y-3">
              <View>
                <Text className="text-sm font-jarkatamedium text-gray-500">Name</Text>
                <Text className="font-jarkatamedium text-gray-900">{invoice?.client_name}</Text>
              </View>
              <View>
                <Text className="text-sm font-jarkatamedium text-gray-500">Email</Text>
                <Text className="font-jarkatamedium text-gray-900">{invoice?.client_email}</Text>
              </View>
              {invoice?.client_phone && (
                <View>
                  <Text className="text-sm font-jarkatamedium text-gray-500">Phone</Text>
                  <Text className="font-jarkatamedium text-gray-900">{invoice?.client_phone}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Items */}
          <View className="mt-4 rounded-xl bg-white p-4">
            <Text className="text-lg font-jarkatasemibold text-gray-900 mb-4">Items</Text>
            {invoice?.items?.map((item, index) => (
              <View key={index} className="flex-row justify-between py-2 border-b border-gray-100">
                <View className="flex-1">
                  <Text className="font-jarkatamedium text-gray-900">{item.description}</Text>
                  <Text className="text-sm font-jarkatalight text-gray-500">
                    {item.quantity} x ₦{item.unit_price}
                  </Text>
                </View>
                <Text className="font-jarkatamedium text-gray-900">
                  ₦{(item.quantity * item.unit_price).toLocaleString()}
                </Text>
              </View>
            ))}
            <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-200">
              <Text className="font-jarkatasemibold text-gray-900">Total</Text>
              <Text className="font-jarkatasemibold text-gray-900">
                ₦{invoice?.amount?.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Notes */}
          {invoice?.notes && (
            <View className="mt-4 rounded-xl bg-white p-4">
              <Text className="text-lg font-jarkatasemibold text-gray-900 mb-2">Notes</Text>
              <Text className="font-jarkatamedium text-gray-600">{invoice.notes}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
} 