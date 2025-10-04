import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useCreateInvoice, useGetClient } from '~/hooks/use-invoice';
import { useToast } from '~/context/ToastContext';
import { router } from 'expo-router';
import { Button } from '../reusbales/Button';
import ItemRow from './ItemRow';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

const createInvoiceSchema = z.object({
  clientId: z.number().min(1, 'Client is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  currency: z.string().min(1, 'Currency is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  items: z
    .array(
      z.object({
        name: z.string().min(1, 'Item name is required'),
        description: z.string().optional(),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        amount: z.number().min(0, 'Amount must be greater than or equal to 0'),
      })
    )
    .min(1, 'At least one item is required'),
  discountType: z.enum(['percentage', 'fixed']),
  discountValue: z.number().min(0),
  invoiceType: z.enum(['one-time', 'recurring']),
  recurrenceInterval: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
  recurrenceCount: z.number().min(1).optional(),
  acceptsFiatPayment: z.boolean(),
  notes: z.string().optional(),
});

type CreateInvoiceFormData = z.infer<typeof createInvoiceSchema>;

export const CreateInvoice = () => {
  const { showToast } = useToast();
  const { mutate: createInvoice, isPending, isSuccess, isError, error } = useCreateInvoice();
  const { data: clientsData, refetch: refetchClients } = useGetClient();
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (isSuccess) {
      showToast({ type: 'success', message: 'Invoice created successfully!' });
      router.back();
    }
  }, [isSuccess, showToast]);

  useEffect(() => {
    if (isError) {
      showToast({ type: 'error', message: 'Failed to create invoice. Please try again.' });
      console.error('Invoice creation error:', error);
    }
  }, [isError, error, showToast]);

  // Refresh clients when component mounts or when returning from create client
  useEffect(() => {
    refetchClients();
  }, [refetchClients]);

  const handleCreateInvoice = (payload: any) => {
    createInvoice(payload);
  };

  const handleClientSelect = (client: any) => {
    setSelectedClient(client);
    setValue('clientId', client.id);
    SheetManager.hide('client-selection-sheet');
  };

  const handleCreateNewClient = () => {
    SheetManager.hide('client-selection-sheet');
    router.push('/invoices/create-client');
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setValue('dueDate', format(date, 'yyyy-MM-dd'));
    hideDatePicker();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateInvoiceFormData>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      clientId: 3,
      title: '',
      description: '',
      currency: 'USDC',
      dueDate: '',
      items: [{ name: '', description: '', amount: 0, quantity: 1 }],
      discountType: 'percentage',
      discountValue: 0,
      invoiceType: 'one-time',
      acceptsFiatPayment: true,
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: CreateInvoiceFormData) => {
    const payload = {
      clientId: data.clientId,
      title: data.title,
      description: data.description || '',
      items: data.items.map(item => ({
        name: item.name,
        description: item.description || '',
        amount: item.amount,
        quantity: item.quantity,
      })),
      currency: data.currency,
      discountType: data.discountType,
      discountValue: data.discountValue,
      dueDate: data.dueDate,
      invoiceType: data.invoiceType,
      recurrenceInterval: data.invoiceType === 'recurring' ? data.recurrenceInterval : undefined,
      recurrenceCount: data.invoiceType === 'recurring' ? data.recurrenceCount : undefined,
      acceptsFiatPayment: data.acceptsFiatPayment,
      notes: data.notes || '',
    };

    handleCreateInvoice(payload);
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="">
        <View className="">
          <View className="flex-row items-center gap-6 py-6">
            <Text className="font-jarkatabold text-xs text-gray-400">
              CLIENT SELECTION
            </Text>
            <View className="flex-1 border-b border-gray-200" />
          </View>

          <Controller
            control={control}
            name="clientId"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">
                  Select Client
                </Text>
                <TouchableOpacity
                  onPress={() => SheetManager.show('client-selection-sheet')}
                  className="rounded-lg border border-gray-200 px-4 py-3 flex-row items-center justify-between"
                >
                  <Text className="font-jarkataregular text-sm text-gray-900">
                    {selectedClient ? `${selectedClient.contactName || selectedClient.businesName} (${selectedClient.clientIdentifier})` : clientsData?.data?.clients?.find((client: any) => client.id === value) ? `${clientsData.data.clients.find((client: any) => client.id === value).contactName || clientsData.data.clients.find((client: any) => client.id === value).businesName} (${clientsData.data.clients.find((client: any) => client.id === value).clientIdentifier})` : 'Select a client'}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#6B7280" />
                </TouchableOpacity>
                {errors.clientId && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.clientId.message}
                  </Text>
                )}
              </View>
            )}
          />


          <View className="flex-row items-center gap-6 py-6">
            <Text className="font-jarkatabold text-xs text-gray-400">
              INVOICE DETAILS
            </Text>
            <View className="flex-1 border-b border-gray-200" />
          </View>

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">Invoice Title</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 px-4 py-3 font-jarkataregular text-sm"
                  placeholder="Enter invoice title"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.title && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.title.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">Description</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 px-4 py-3 font-jarkataregular text-sm"
                  placeholder="Enter invoice description"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={3}
                />
                {errors.description && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.description.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="currency"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">Currency</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 px-4 py-3 font-jarkataregular text-sm"
                  placeholder="Enter currency"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.currency && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.currency.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="dueDate"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">Due Date</Text>
                <TouchableOpacity
                  onPress={showDatePicker}
                  className="rounded-lg border border-gray-200 px-4 py-3 flex-row items-center justify-between"
                >
                  <Text className="font-jarkataregular text-sm text-gray-900">
                    {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : value || 'Select due date'}
                  </Text>
                  <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                </TouchableOpacity>
                {errors.dueDate && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.dueDate.message}
                  </Text>
                )}
              </View>
            )}
          />

          <View className="mt-4 flex-row items-center gap-6 py-4">
            <Text className="font-jarkatabold text-xs text-gray-400">
              INVOICE ITEMS
            </Text>
            <View className="flex-1 border-b border-gray-200" />
          </View>
          <Text className="mb-4 font-jarkatamedium text-gray-700">Items</Text>
          {fields.map((field, index) => (
            <ItemRow
              key={field.id}
              control={control}
              index={index}
              field={field}
              remove={fields.length > 1 ? remove : undefined}
              errors={errors}
            />
          ))}
          <Pressable
            onPress={() => append({ name: '', description: '', amount: 0, quantity: 1 })}
            className="mb-6 flex-row items-center justify-center rounded-lg py-5">
            <Ionicons name="add" size={14} color="#167D7F" />
            <Text className="ml-2 font-jarkatamedium text-primary-500">Add Item</Text>
          </Pressable>

          <View className="flex-row items-center justify-between border-y mb-6 py-4 border-gray-200 pt-4">
            <Text className="font-jarkatabold text-gray-800">Total</Text>
            <Text className="font-jarkatabold text-gray-600">$ 00.00</Text>
          </View>
          
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            className="mb-4 flex-row items-center justify-center rounded-lg bg-[#167D7F] py-4">
            <Text className="font-jarkatamedium text-white">
              {isPending ? 'Creating...' : 'Create Invoice'}
            </Text>
          </Pressable>

          <Button variant="outline">Save as Draft</Button>
        </View>
      </View>

      {/* Client Selection Sheet */}
      <ActionSheet
        id="client-selection-sheet"
        isModal={true}
        closable={true}
        backgroundInteractionEnabled={false}
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
        }}>
        <View className="py-6 px-6">
          <Text className="text-lg font-jarkatabold text-black mb-6 text-center">Select Client</Text>
          
          <FlatList
            data={clientsData?.data?.clients || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleClientSelect(item)}
                className="flex-row items-center py-4 border-b border-gray-100"
              >
                <View className="flex-1">
                  <Text className="text-base font-jarkatamedium text-black">
                    {item.contactName || item.businesName || 'Unnamed Client'}
                  </Text>
                  <Text className="text-sm font-jarkataregular text-gray-500">
                    {item.clientIdentifier}
                  </Text>
                </View>
                {selectedClient?.id === item.id && (
                  <Ionicons name="checkmark" size={20} color="#167D7F" />
                )}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className="py-8 items-center">
                <Text className="text-base font-jarkatamedium text-gray-500 mb-2">No clients found</Text>
                <Text className="text-sm font-jarkataregular text-gray-400 text-center">
                  Create your first client to get started
                </Text>
              </View>
            }
          />

          <TouchableOpacity
            onPress={handleCreateNewClient}
            className="mt-4 flex-row items-center justify-center py-4 border border-dashed border-[#167D7F] rounded-xl"
          >
            <Ionicons name="add" size={20} color="#167D7F" />
            <Text className="ml-2 font-jarkatamedium text-[#167D7F] text-base">
              Create New Client
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
        display="default"
      />
    </ScrollView>
  );
};
