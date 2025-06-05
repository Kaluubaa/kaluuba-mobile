import React from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useCreateInvoice } from '~/hooks/use-invoice';
import { useToast } from '~/context/ToastContext';
import { router } from 'expo-router';

const createInvoiceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  currency: z.string().min(1, 'Currency is required'),
  items: z.array(
    z.object({
      description: z.string().min(1, 'Description is required'),
      amount: z.number().min(0, 'Amount must be greater than 0'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
    })
  ).min(1, 'At least one item is required'),
});

type CreateInvoiceFormData = z.infer<typeof createInvoiceSchema>;

export const CreateInvoice = () => {
  const { showToast } = useToast();
  const { mutate: createInvoice, isPending } = useCreateInvoice();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateInvoiceFormData>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      title: '',
      currency: 'USDC',
      items: [{ description: '', amount: 0, quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: CreateInvoiceFormData) => {
    createInvoice(
      {
        ...data,
        status: 'draft',
        createdAt: new Date(),
        id: '', // This will be set by the backend
      },
      {
        onSuccess: () => {
          showToast({
            type: 'success',
            message: 'Invoice Created',
            description: 'Your invoice has been created successfully.',
          });
          router.push('/(tabs)/invoices');
        },
        onError: (error) => {
          showToast({
            type: 'error',
            message: 'Creation Failed',
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="font-clashmedium text-2xl text-gray-900">Create Invoice</Text>
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center rounded-full bg-gray-100 px-4 py-2">
            <Ionicons name="close" size={20} color="#374151" />
            <Text className="ml-2 font-jarkatamedium text-gray-700">Cancel</Text>
          </Pressable>
        </View>

        <View className="rounded-xl bg-white p-4 shadow-sm">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-gray-700">Title</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-jarkataregular"
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
            name="currency"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-gray-700">Currency</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-jarkataregular"
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

          <Text className="mb-4 font-jarkatamedium text-gray-700">Items</Text>
          {fields.map((field, index) => (
            <View key={field.id} className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <View className="mb-4 flex-row items-center justify-between">
                <Text className="font-jarkatamedium text-gray-700">Item {index + 1}</Text>
                {fields.length > 1 && (
                  <Pressable
                    onPress={() => remove(index)}
                    className="rounded-full bg-red-100 p-2">
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </Pressable>
                )}
              </View>

              <Controller
                control={control}
                name={`items.${index}.description`}
                render={({ field: { onChange, value } }) => (
                  <View className="mb-4">
                    <Text className="mb-2 font-jarkataregular text-gray-600">Description</Text>
                    <TextInput
                      className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-jarkataregular"
                      placeholder="Enter item description"
                      value={value}
                      onChangeText={onChange}
                    />
                    {errors.items?.[index]?.description && (
                      <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                        {errors.items[index]?.description?.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <View className="flex-row gap-4">
                <Controller
                  control={control}
                  name={`items.${index}.amount`}
                  render={({ field: { onChange, value } }) => (
                    <View className="flex-1">
                      <Text className="mb-2 font-jarkataregular text-gray-600">Amount</Text>
                      <TextInput
                        className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-jarkataregular"
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        value={value?.toString() || ''}
                        onChangeText={(text) => onChange(parseFloat(text) || 0)}
                      />
                      {errors.items?.[index]?.amount && (
                        <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                          {errors.items[index]?.amount?.message}
                        </Text>
                      )}
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name={`items.${index}.quantity`}
                  render={({ field: { onChange, value } }) => (
                    <View className="w-24">
                      <Text className="mb-2 font-jarkataregular text-gray-600">Quantity</Text>
                      <TextInput
                        className="rounded-lg border border-gray-200 bg-white px-4 py-3 font-jarkataregular"
                        placeholder="1"
                        keyboardType="number-pad"
                        value={value?.toString() || ''}
                        onChangeText={(text) => onChange(parseInt(text) || 1)}
                      />
                      {errors.items?.[index]?.quantity && (
                        <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                          {errors.items[index]?.quantity?.message}
                        </Text>
                      )}
                    </View>
                  )}
                />
              </View>
            </View>
          ))}

          <Pressable
            onPress={() => append({ description: '', amount: 0, quantity: 1 })}
            className="mb-6 flex-row items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-4">
            <Ionicons name="add-circle-outline" size={24} color="#6B7280" />
            <Text className="ml-2 font-jarkatamedium text-gray-500">Add Item</Text>
          </Pressable>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            className="flex-row items-center justify-center rounded-lg bg-primary-500 py-4">
            <Text className="font-jarkatamedium text-white">
              {isPending ? 'Creating...' : 'Create Invoice'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}; 