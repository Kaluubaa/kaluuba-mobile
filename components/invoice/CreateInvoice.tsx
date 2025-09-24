import React from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useCreateInvoice } from '~/hooks/use-invoice';
import { useToast } from '~/context/ToastContext';
import { router } from 'expo-router';
import { Button } from '../reusbales/Button';
import ItemRow from './ItemRow';

const createInvoiceSchema = z.object({
  clientname: z.string().min(1, 'Customer name is required'),
  clientemail: z.string().email('Invalid email address'),
  title: z.string().min(1, 'Title is required'),
  currency: z.string().min(1, 'Currency is required'),
  duedate: z.string().optional(),
  items: z
    .array(
      z.object({
        description: z.string().min(1, 'Description is required'),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        price: z.number().min(0, 'Price must be greater than or equal to 0'),
        amount: z.number().min(0, 'Amount must be greater than 0'),
      })
    )
    .min(1, 'At least one item is required'),
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
   
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="">
        <View className="">
          <View className="flex-row items-center gap-6  py-6">
            <Text className="font-jarkatasemibold text-xs font-semibold text-gray-400">
              YOUR CLIENT&apos;S INFORMATION
            </Text>
            <View className="flex-1 border-b border-gray-200" />
          </View>

          <Controller
            control={control}
            name="clientname"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">
                  Client&apos;s Name
                </Text>
                <TextInput
                  className="rounded-lg border border-gray-200  px-4 py-3 font-jarkataregular text-sm"
                  placeholder="Enter customer name"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.clientname && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.clientname.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="clientemail"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">
                  Client&apos;s Email
                </Text>
                <TextInput
                  className="rounded-lg border border-gray-200 px-4 py-3 font-jarkataregular text-sm"
                  placeholder="Enter customer email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.clientemail && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.clientemail.message}
                  </Text>
                )}
              </View>
            )}
          />

          <View className="flex-row items-center gap-6  py-6">
            <Text className="font-jarkatasemibold text-xs font-semibold text-gray-400">
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
                  className="rounded-lg border border-gray-200  px-4 py-3 font-jarkataregular text-sm"
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
            name="duedate"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">Due Date</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 px-4 py-3 font-jarkataregular text-sm"
                  placeholder="YYYY-MM-DD"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.duedate && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.duedate.message}
                  </Text>
                )}
              </View>
            )}
          />

          <View className="mt-4 flex-row items-center gap-6  py-4">
            <Text className="font-jarkatasemibold text-xs font-semibold text-gray-400">
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
            onPress={() => append({ description: '', amount: 0, quantity: 1, price: 0 })}
            className="mb-6 flex-row items-center justify-center rounded-lg py-5">
            <Ionicons name="add" size={14} color="#167D7F" />
            <Text className="ml-2 font-jarkatamedium text-primary-500">Add Item</Text>
          </Pressable>

          <View className="flex-row items-center justify-between border-y mb-6 py-4 border-gray-200 pt-4">
            <Text className="font-jarkatasemibold text-gray-800">Total</Text>

            <Text className="font-jarkatasemibold text-gray-600">$ 00.00</Text>


          </View>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            className="mb-4 flex-row items-center justify-center rounded-lg bg-primary-500 py-4">
            <Text className="font-jarkatamedium text-white">
              {isPending ? 'Creating...' : 'Preview Invoice'}
            </Text>
          </Pressable>

          <Button variant="outline">Save as Draft</Button>
        </View>
      </View>
    </ScrollView>
  );
};
