import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '~/components/reusbales/Input';
import { Button } from '~/components/reusbales/Button';
import { Container } from '~/components/reusbales/Container';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import endpoints, { API_BASE_URL } from '~/services/endpoints';
import { useToast } from '~/context/ToastContext';

const resetSchema = z.object({
 email: z.string().email('Please enter a valid email address'),
 code: z.string().min(6, 'Code must be 6 digits'),
 new_password: z.string().min(8, 'Password must be at least 8 characters'),
});

type ResetFormData = z.infer<typeof resetSchema>;

const ResetPassword = () => {
 const params = useLocalSearchParams();
 const {
  control,
  handleSubmit,
  formState: { errors },
 } = useForm<ResetFormData>({
  resolver: zodResolver(resetSchema),
  defaultValues: {
   email: typeof params.email === 'string' ? params.email : '',
   code: '',
   new_password: '',
  },
 });
 const { showToast } = useToast();
 const [loading, setLoading] = React.useState(false);

 const onSubmit = async (data: ResetFormData) => {
  setLoading(true);
  try {
   const res = await fetch(`${API_BASE_URL}${endpoints.auth.resetPassword}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: data.email, code: data.code, new_password: data.new_password }),
   });
   const result = await res.json();
   if (!res.ok) throw new Error(result.error || 'Failed to reset password');
   showToast({ type: 'success', message: 'Password reset!', description: 'You can now log in with your new password.' });
   router.replace('/auth/login');
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
      <Text className="font-clashmedium text-2xl text-gray-900">Reset Password</Text>
     </Pressable>
     <Text className="mt-3 font-jarkataregular text-gray-600">
      Enter the code sent to your email and choose a new password.
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
     <Controller
      control={control}
      name="code"
      render={({ field: { onChange, value } }) => (
       <Input
        label="Reset Code"
        placeholder="Enter the code"
        leftIcon="key-outline"
        keyboardType="number-pad"
        onChangeText={onChange}
        value={value}
        error={errors.code?.message}
       />
      )}
     />
     <Controller
      control={control}
      name="new_password"
      render={({ field: { onChange, value } }) => (
       <Input
        label="New Password"
        placeholder="Enter new password"
        leftIcon="lock-closed-outline"
        secureTextEntry
        onChangeText={onChange}
        value={value}
        error={errors.new_password?.message}
       />
      )}
     />
    </View>
    <View className="my-8 px-2">
     <Button size="lg" className="h-[46px]" onPress={handleSubmit(onSubmit)}>
      Reset Password
     </Button>
    </View>
   </View>
  </Container>
 );
};

export default ResetPassword; 