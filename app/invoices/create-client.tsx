import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '~/context/ToastContext';
import { router } from 'expo-router';
import { Container } from '~/components/reusbales/Container';
import { Button } from '~/components/reusbales/Button';
import { useCreateClient } from '~/hooks/use-invoice';

const createClientSchema = z.object({
  name: z.string().min(1, 'Customer name is required'),
  clientIdentifier: z
    .string()
    .min(1, 'Email or username is required')
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      },
      {
        message:
          'Must be a valid email or username (minimum 3 characters, alphanumeric, ._- allowed)',
      }
    ),
  phoneNumber: z
    .string()
    .optional()
    .refine((value) => !value || /^\+?[1-9]\d{1,14}$/.test(value), {
      message: 'Invalid phone number format',
    }),
});

type CreateClientFormData = z.infer<typeof createClientSchema>;

const CreateClient = () => {
  const { showToast } = useToast();
  const { mutate: createClient, isPending } = useCreateClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientFormData>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: '',
      clientIdentifier: '',
      phoneNumber: '',
    },
  });

  const onSubmit = (data: CreateClientFormData) => {
    createClient(
      {
        clientIdentifier: data.clientIdentifier,
        bussinesName: data.name,
      },
      {
        onSuccess: () => {
          showToast({
            type: 'success',
            message: 'Client Created',
            description: 'Your client has been created successfully.',
          });
          router.back();
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
    <Container className="flex-1 bg-white px-2">
        <View className="flex-1 py-4">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()} className="w-1/12">
              <Ionicons name="chevron-back" size={20} color="#167D7F" />
            </TouchableOpacity>
            <Text className="font-clashmedium text-lg tracking-wider text-gray-600">
              Create Client/Customer
            </Text>
          </View>

          <View className="mt-4 flex-row items-center gap-6 py-4">
            <Text className="font-jarkatasemibold text-xs font-semibold text-gray-400">
              CLIENT DETAILS
            </Text>
            <View className="flex-1 border-b border-gray-200" />
          </View>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">Customer Name</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 px-4 py-3 font-jarkataregular text-sm"
                  placeholder="Enter customer name"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.name && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.name.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="clientIdentifier"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">
                  Email or Username
                </Text>
                <TextInput
                  className="rounded-lg border border-gray-200 px-4 py-3 font-jarkataregular text-sm"
                  placeholder="Enter email or username"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.clientIdentifier && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.clientIdentifier.message}
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">
                  Phone Number (Optional)
                </Text>
                <TextInput
                  className="rounded-lg border border-gray-200 px-4 py-3 font-jarkataregular text-sm"
                  placeholder="Enter phone number (e.g., +2341234567890)"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.phoneNumber && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </Text>
                )}
              </View>
            )}
          />


          <View className="mt-auto gap-4 ustify-between">
             <Button
              className="w-full bg-primary-500"
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}>
              {isPending ? 'Creating...' : 'Save Client'}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onPress={() => router.back()}
              disabled={isPending}>
              Cancel
            </Button>
           
          </View>
        </View>
    </Container>
  );
};

export default CreateClient;
