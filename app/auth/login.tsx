import React from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '~/components/reusbales/Input';
import { Button } from '~/components/reusbales/Button';
import { Container } from '~/components/reusbales/Container';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);
    // Handle login logic here
  };

  return (
    <Container className="flex-1 bg-white">
      <View className="px-2 py-6">
        <View className="mb-8">
          <View className="flex-row items-center gap-3">
            <Ionicons name="chevron-back" size={22} color="#000000" />
            <Text className="font-clashmedium text-2xl text-gray-900">Sign To Your Account</Text>
          </View>
          <Text className="font-jarkataregular mt-3 text-gray-600">
            Welcome back 🚀! Please enter your credentials to continue.
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
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                leftIcon="lock-closed-outline"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
              />
            )}
          />

          <Text className='text-sm font-jarkatalight text-right text-gray-700'>Forgotten Password?</Text>
        </View>

        <View className="my-8 px-2">
          <Button size="lg" className="h-[46px]" onPress={handleSubmit(onSubmit)}>
            Sign In
          </Button>
        </View>
        <View className="flex-row items-center justify-center space-x-1">
          <Text className="font-jarkataregular text-sm text-gray-600">Don&apos;t have an account?</Text>
          <Link href="/auth/signup" className="font-jarkatamedium text-primary-500">
            Sign Up
          </Link>
        </View>
      </View>
    </Container>
  );
};

export default Login;
