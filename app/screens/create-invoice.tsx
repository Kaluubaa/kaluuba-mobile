import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '~/components/reusbales/Input';
import { Button } from '~/components/reusbales/Button';
import Header from '~/components/reusbales/Header';
import { Container } from '~/components/reusbales/Container';

const itemSchema = z.object({
  name: z.string().min(1, 'Item name required'),
  quantity: z.coerce.number().min(1, 'Quantity required'),
  price: z.coerce.number().min(0.01, 'Price required'),
});

const invoiceSchema = z.object({
  customerName: z.string().min(2, 'Customer name required'),
  customerEmail: z.string().email('Valid email required'),
  dueDate: z.string().min(1, 'Due date required'),
  items: z.array(itemSchema).min(1, 'Add at least one item'),
  notes: z.string().optional(),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

const defaultValues: InvoiceFormData = {
  customerName: '',
  customerEmail: '',
  dueDate: '',
  items: [{ name: '', quantity: 1, price: 0 }],
  notes: '',
};

const CreateInvoice = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (data: InvoiceFormData) => {
    setSubmitting(true);
    // TODO: Call your API here
    setTimeout(() => setSubmitting(false), 1000);
  };

  return (
    <Container className="flex-1 bg-white" loading={submitting}>
      <Header title="Create an Invoice" />
      <ScrollView className=" px-2 py-4" keyboardShouldPersistTaps="handled">
        <View className='gap-4'>

        <Controller
          control={control}
          name="customerName"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Customer Name"
              placeholder="Enter customer name"
              leftIcon="person-outline"
              onChangeText={onChange}
              value={value}
              error={errors.customerName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="customerEmail"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Customer Email"
              placeholder="Enter customer email"
              leftIcon="mail-outline"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
              error={errors.customerEmail?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Due Date"
              placeholder="YYYY-MM-DD"
              leftIcon="calendar-outline"
              onChangeText={onChange}
              value={value}
              error={errors.dueDate?.message}
            />
          )}
        />
        </View>
        <Text className="mb-2 mt-6 font-jarkatamedium text-base text-gray-800">Invoice Items</Text>
        {fields.map((item, idx) => (
          <View key={item.id} className="mb-2 flex-row items-end gap-2">
            <View className="flex-1">
              <Controller
                control={control}
                name={`items.${idx}.name`}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Item Name"
                    placeholder="e.g. Design Work"
                    onChangeText={onChange}
                    value={value}
                    error={errors.items?.[idx]?.name?.message}
                  />
                )}
              />
            </View>
            <View className="w-20">
              <Controller
                control={control}
                name={`items.${idx}.quantity`}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Qty"
                    placeholder="1"
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={String(value)}
                    error={errors.items?.[idx]?.quantity?.message}
                  />
                )}
              />
            </View>
            <View className="w-24">
              <Controller
                control={control}
                name={`items.${idx}.price`}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Price"
                    placeholder="0.00"
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={String(value)}
                    error={errors.items?.[idx]?.price?.message}
                  />
                )}
              />
            </View>
            <TouchableOpacity onPress={() => remove(idx)} className="ml-1 p-1">
              <Text className="text-lg text-red-500">×</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Button
          variant="outline"
          className="my-2"
          onPress={() => append({ name: '', quantity: 1, price: 0 })}>
          + Add Item
        </Button>
        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Notes (optional)"
              placeholder="Add any notes for the customer"
              onChangeText={onChange}
              value={value}
              error={errors.notes?.message}
              multiline
            />
          )}
        />
        <Button size="lg" className="mt-6 h-[46px]" onPress={handleSubmit(onSubmit)}>
          Create Invoice
        </Button>
      </ScrollView>
    </Container>
  );
};

export default CreateInvoice;
