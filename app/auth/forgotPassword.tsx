import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '~/components/reusbales/Input';
import { Button } from '~/components/reusbales/Button';
import { Container } from '~/components/reusbales/Container';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import endpoints, { API_BASE_URL } from '~/services/endpoints';
import { useToast } from '~/context/ToastContext';

const forgotSchema = z.object({
 email: z.string().email('Please enter a valid email address'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

const ForgotPassword = () => {
 const {
  control,
  handleSubmit,
  formState: { errors },
 } = useForm<ForgotFormData>({
  resolver: zodResolver(forgotSchema),
  defaultValues: { email: '' },
 });
 const { showToast } = useToast();
 const [loading, setLoading] = React.useState(false);

 const onSubmit = async (data: ForgotFormData) => {
  setLoading(true);
  try {
   const res = await fetch(`${API_BASE_URL}${endpoints.auth.forgotPassword}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: data.email }),
   });
   const result = await res.json();
   if (!res.ok) throw new Error(result.error || 'Failed to send reset code');
   showToast({ type: 'success', message: 'Reset code sent!', description: 'Check your email for the code.' });
   router.push({ pathname: '/auth/resetPassword', params: { email: data.email } });
  } catch (err: any) {
   showToast({ type: 'error', message: 'Error', description: err.message });
  } finally {
   setLoading(false);
  }
 };

 return (
  <Container className="flex-1 bg-white" loading={loading}>
   <View className="px-2 py-6">
    <View className="mb-8">
     <Pressable onPress={() => router.back()} className="mb-6 flex-row items-center gap-3">
      <Text className="font-clashmedium text-2xl text-gray-900">Forgot Password</Text>
     </Pressable>
     <Text className="mt-3 font-jarkataregular text-gray-600">
      Enter your email address and we will send you a code to reset your password.
     </Text>
    </View>
    <View className="gap-4">
     <Controller
      control={control}
      name="email"
      render={({ field: { onChange, value } }) => (
       <Input
        label="Email"
        placeholder="Enter your email"
        leftIcon="mail-outline"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={onChange}
        value={value}
        error={errors.email?.message}
       />
      )}
     />
    </View>
    <View className="my-8 px-2">
     <Button size="lg" className="h-[46px]" onPress={handleSubmit(onSubmit)}>
      Send Reset Code
     </Button>
    </View>
   </View>
  </Container>
 );
};

export default ForgotPassword; 