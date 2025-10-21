import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useCreateInvoice, useGetClient } from '~/hooks/use-invoice';
import { useQueryClient } from '@tanstack/react-query';
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
  invoiceType: z.enum(['one_time', 'recurring']),
  recurrenceInterval: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
  recurrenceCount: z.number().min(1).optional(),
  acceptsFiatPayment: z.boolean(),
  notes: z.string().optional(),
});

type CreateInvoiceFormData = z.infer<typeof createInvoiceSchema>;

export const CreateInvoice = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: createInvoice, isPending, isSuccess, isError, error } = useCreateInvoice();
  const { data: clientsData, refetch: refetchClients } = useGetClient();
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleCreateInvoice = (payload: any) => {
    console.log('Payload:', payload);
    createInvoice(payload, {
      onSuccess: () => {
        showToast({ type: 'success', message: 'Invoice created successfully!' });
        queryClient.invalidateQueries({ queryKey: ['client', 'invoices'] });
        router.back();
      },
      onError: (error: any) => {
        showToast({ type: 'error', message: 'Failed to create invoice. Please try again.' });
        console.log('Invoice creation error:', error);
      },
    });
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
    watch,
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
      invoiceType: 'one_time',
      acceptsFiatPayment: true,
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // Watch items to calculate total
  const watchedItems = watch('items');
  const total = watchedItems?.reduce((sum, item) => sum + (item.amount * item.quantity), 0) || 0;
  
  // Watch invoice type to show/hide recurrence fields
  const invoiceType = watch('invoiceType');

  const onSubmit = (data: CreateInvoiceFormData) => {
    const payload = {
      clientId: data.clientId,
      title: data.title,
      description: data.description || '',
      items: data.items.map((item) => ({
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
            <Text className="font-jarkatabold text-xs text-gray-400">CLIENT SELECTION</Text>
            <View className="flex-1 border-b border-gray-200" />
          </View>

          <Controller
            control={control}
            name="clientId"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">Select Client</Text>
                <TouchableOpacity
                  onPress={() => SheetManager.show('client-selection-sheet')}
                  className="flex-row items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                  <Text className="font-jarkataregular text-sm text-gray-900">
                    {selectedClient
                      ? selectedClient.clientIdentifier
                      : clientsData?.data?.clients?.find((client: any) => client.id === value)
                        ? clientsData.data.clients.find((client: any) => client.id === value).clientIdentifier
                        : 'Select a client'}
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
            <Text className="font-jarkatabold text-xs text-gray-400">INVOICE DETAILS</Text>
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
                  className="flex-row items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                  <Text className="font-jarkataregular text-sm text-gray-900">
                    {selectedDate
                      ? format(selectedDate, 'MMM dd, yyyy')
                      : value || 'Select due date'}
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

          <Controller
            control={control}
            name="invoiceType"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">Invoice Type</Text>
                <View className="flex-row gap-4">
                  <TouchableOpacity
                    onPress={() => onChange('one_time')}
                    className="flex-row items-center">
                    <View className="mr-2 h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
                      {value === 'one_time' && (
                        <View className="h-3 w-3 rounded-full bg-primary-500" />
                      )}
                    </View>
                    <Text className="font-jarkataregular text-sm text-gray-700">One_time</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => onChange('recurring')}
                    className="flex-row items-center">
                    <View className="mr-2 h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
                      {value === 'recurring' && (
                        <View className="h-3 w-3 rounded-full bg-primary-500" />
                      )}
                    </View>
                    <Text className="font-jarkataregular text-sm text-gray-700">Recurring</Text>
                  </TouchableOpacity>
                </View>
                {errors.invoiceType && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.invoiceType.message}
                  </Text>
                )}
              </View>
            )}
          />

          {invoiceType === 'recurring' && (
            <Controller
              control={control}
              name="recurrenceInterval"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">Recurrence Interval</Text>
                  <TouchableOpacity
                    onPress={() => SheetManager.show('recurrence-interval-sheet')}
                    className="flex-row items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                    <Text className="font-jarkataregular text-sm text-gray-900">
                      {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Select interval'}
                    </Text>
                    <Ionicons name="chevron-down" size={16} color="#6B7280" />
                  </TouchableOpacity>
                  {errors.recurrenceInterval && (
                    <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                      {errors.recurrenceInterval.message}
                    </Text>
                  )}
                </View>
              )}
            />
          )}

          <View className="mt-4 flex-row items-center gap-6 py-4">
            <Text className="font-jarkatabold text-xs text-gray-400">INVOICE ITEMS</Text>
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
            <Ionicons name="add" size={14} color="#306B4F" />
            <Text className="ml-2 font-jarkatamedium text-primary-500">Add Item</Text>
          </Pressable>

          <View className="mb-6 flex-row items-center justify-between border-y border-gray-200 py-4 pt-4">
            <Text className="font-jarkatabold text-gray-800">Total</Text>
            <Text className="font-jarkatabold text-gray-600">${total.toFixed(2)}</Text>
          </View>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            className="mb-4 flex-row items-center justify-center rounded-lg bg-primary-500 py-4">
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
        <View className="px-6 py-6">
          <Text className="mb-6 text-center font-jarkatabold text-lg text-black">
            Select Client
          </Text>

          <FlatList
            data={clientsData?.data?.clients || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleClientSelect(item)}
                className="flex-row items-center border-b border-gray-100 py-4">
                <View className="flex-1">
                  <Text className="font-jarkatamedium text-base text-black">
                    {item.contactName || item.businesName || 'Unnamed Client'}
                  </Text>
                  <Text className="font-jarkataregular text-sm text-gray-500">
                    {item.clientIdentifier}
                  </Text>
                </View>
                {selectedClient?.id === item.id && (
                  <Ionicons name="checkmark" size={20} color="#306B4F" />
                )}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className="items-center py-8">
                <Text className="mb-2 font-jarkatamedium text-base text-gray-500">
                  No clients found
                </Text>
                <Text className="text-center font-jarkataregular text-sm text-gray-400">
                  Create your first client to get started
                </Text>
              </View>
            }
          />

          <TouchableOpacity
            onPress={handleCreateNewClient}
            className="mt-4 flex-row items-center justify-center rounded-xl border border-dashed border-primary-500 py-4">
            <Ionicons name="add" size={20} color="#306B4F" />
            <Text className="ml-2 font-jarkatamedium text-base text-primary-500">
              Create New Client
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      {/* Recurrence Interval Selection Sheet */}
      <ActionSheet
        id="recurrence-interval-sheet"
        isModal={true}
        closable={true}
        backgroundInteractionEnabled={false}
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
        }}>
        <View className="px-6 py-6">
          <Text className="mb-6 text-center font-jarkatabold text-lg text-black">
            Select Recurrence Interval
          </Text>
          
          {['daily', 'weekly', 'monthly', 'yearly'].map((interval) => (
            <TouchableOpacity
              key={interval}
              onPress={() => {
                setValue('recurrenceInterval', interval as 'daily' | 'weekly' | 'monthly' | 'yearly');
                SheetManager.hide('recurrence-interval-sheet');
              }}
              className="flex-row items-center border-b border-gray-100 py-4">
              <Text className="font-jarkatamedium text-base text-black">
                {interval.charAt(0).toUpperCase() + interval.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
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
