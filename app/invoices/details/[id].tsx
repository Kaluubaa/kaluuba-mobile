import {
  View,
  Text,
  ScrollView,
  DimensionValue,
  ViewStyle,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Container } from '~/components/reusbales/Container';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '~/services/api';
import { Invoice } from '~/types/invoice.t';
import { Button } from '~/components/reusbales/Button';
import Header from '~/components/reusbales/Header';
import { useState } from 'react';
import ShareInvoiceModal from '~/components/invoice/ShareInvoiceModal';

// Skeleton Loader Component
const Skeleton = ({
  width = '100%',
  height = 20,
  style = {},
}: {
  width?: DimensionValue;
  height?: number;
  style?: ViewStyle;
}) => (
  <View
    style={[
      {
        backgroundColor: '#e5e7eb',
        borderRadius: 8,
        width,
        height,
        marginBottom: 8,
      },
      style,
    ]}
  />
);

const getStatusColor = (status?: string) => {
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
  return items?.reduce((total, item) => total + item.amount * item.quantity, 0);
};

export default function InvoiceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const { data, isLoading } = useQuery<any>({
    queryKey: ['invoice', id],
    queryFn: () => apiGet<any>(`/invoices/${id}`),
  });

  const invoice = data?.data?.invoice;

  const handleEdit = () => {
    // Dummy edit handler
    console.log('Edit invoice:', id);
    // TODO: Implement edit functionality
  };

  const handleDelete = () => {
    // Dummy delete handler
    console.log('Delete invoice:', id);
    // TODO: Implement delete functionality
  };

  return (
    <Container>
      <Header title="Invoice details" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {isLoading || !invoice ? (
          <View className="p-4">
            <Skeleton width="60%" height={28} />
            <Skeleton width="40%" height={20} />
            <Skeleton width="100%" height={80} style={{ marginTop: 16 }} />
            <Skeleton width="100%" height={80} />
            <Skeleton width="100%" height={40} style={{ marginTop: 16 }} />
          </View>
        ) : (
          <View className="">
            <View className="rounded-xl bg-white p-4 ">
              <View className="flex-row items-center justify-between">
                <Text className="font-jarkatamedium text-lg text-gray-800">{invoice?.title}</Text>
                <View className={`rounded-full px-3 py-1 ${getStatusColor(invoice?.status)}`}>
                  <Text className="font-jarkatamedium text-sm capitalize">
                    {invoice?.status || 'draft'}
                  </Text>
                </View>
              </View>

              <View className="mt-4 space-y-4">
                <View>
                  <Text className="font-jarkatamedium text-sm text-gray-500">Total Amount</Text>
                  <View className="flex-row items-center mb-2">
                    <Text className="font-jarkatasemibold text-gray-900">
                      {invoice?.currency} {getTotalAmount(invoice?.items)}
                    </Text>
                    <View className="ml-2 rounded-full bg-primary-100 px-2 py-1">
                      <Text className="font-jarkatamedium text-xs text-primary-600">
                        {invoice?.currency}
                      </Text>
                    </View>
                  </View>
                </View>

                {invoice?.created_at && (
                  <View>
                    <Text className="font-jarkatamedium text-sm text-gray-500">Created</Text>
                    <Text className="font-jarkatamedium text-gray-900">
                      {invoice?.created_at}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View className="mt-4 rounded-xl bg-white p-4 ">
              <Text className="mb-4 font-jarkatasemibold text-lg text-gray-900">Items</Text>
              {invoice?.items?.map((item: any, index: number) => (
                <View key={index} className="flex-row justify-between border-b border-gray-100 py-2">
                  <View className="flex-1">
                    <Text className="font-jarkatamedium text-gray-900">{item.description}</Text>
                    <Text className="font-jarkatalight text-sm text-gray-500">
                      {item?.quantity} x {invoice?.currency} {item.amount}
                    </Text>
                  </View>
                  <Text className="font-jarkatamedium text-gray-900">
                    {invoice?.currency} {(item?.amount * item?.quantity)?.toLocaleString()}
                  </Text>
                </View>
              ))}
              <View className="mt-4 flex-row justify-between border-t border-gray-200 pt-4">
                <Text className="font-jarkatasemibold text-gray-900">Total</Text>
                <Text className="font-jarkatasemibold text-gray-900">
                  {invoice?.currency} {getTotalAmount(invoice?.items)?.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View className="py-6 gap-3">
        <Button onPress={() => setModalVisible(true)}>Share Invoice</Button>
        <Button onPress={handleEdit} variant="primary">Edit Invoice</Button>
        <Button onPress={handleDelete} variant="outline" className='border-red-600' textClassName='text-red-600'>Delete Invoice</Button>
      </View>

      <ShareInvoiceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        invoice={invoice}
      />
    </Container>
  );
}