import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView, StatusBar } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '~/context/ToastContext';
import { router } from 'expo-router';
import { useCreateClient } from '~/hooks/use-invoice';

const createClientSchema = z.object({
  clientIdentifier: z.string().min(1, 'Email, Kaluuba username or business name is required'),
  bussinesName: z.string().min(1, 'Business name is required'),
});

type CreateClientFormData = z.infer<typeof createClientSchema>;

const CreateClient = () => {
  const { showToast } = useToast();
  const { mutate: createClient, isPending, isSuccess, isError, error } = useCreateClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientFormData>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      clientIdentifier: '',
      bussinesName: '',
    },
  });

  useEffect(() => {
    if (isSuccess) {
      showToast({ type: 'success', message: 'Client created successfully!' });
      router.back();
    }
  }, [isSuccess, showToast]);

  useEffect(() => {
    if (isError) {
      showToast({ type: 'error', message: 'Failed to create client. Please try again.' });
      console.error('Client creation error:', error);
    }
  }, [isError, error, showToast]);

  const onSubmit = (data: CreateClientFormData) => {
    createClient(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
        <View className="flex-1 px-6 pt-4">
          <View className="mb-8 flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mr-4"
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-2xl font-jarkatabold text-black">
              Create Client
            </Text>
          </View>

          <View className="flex-row items-center gap-6 py-6">
            <Text className="font-jarkatabold text-xs text-gray-400">
              CLIENT DETAILS
            </Text>
            <View className="flex-1 border-b border-gray-200" />
          </View>

          <Controller
            control={control}
            name="bussinesName"
            render={({ field: { onChange, value } }) => (
              <View className="mb-4">
                <Text className="mb-2 font-jarkatamedium text-sm text-gray-500">Business Name</Text>
                <TextInput
                  className="rounded-lg border border-gray-200 px-4 py-3 font-jarkataregular text-sm"
                  placeholder="Enter business name"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.bussinesName && (
                  <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                    {errors.bussinesName.message}
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
                  Email, Kaluuba Username or Business Name
                </Text>
                <TextInput
                  className="rounded-lg border border-gray-200 px-4 py-3 font-jarkataregular text-sm"
                  placeholder="Enter email, username or business name"
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


          <View className="mt-auto gap-4 justify-between">
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
              className="w-full py-4 rounded-xl bg-[#167D7F]"
            >
              <Text className="text-center text-base font-jarkatamedium text-white">
                {isPending ? 'Creating...' : 'Create Client'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => router.back()}
              disabled={isPending}
              className="w-full py-4 rounded-xl bg-gray-200"
            >
              <Text className="text-center text-base font-jarkatamedium text-gray-700">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreateClient;
