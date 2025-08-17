import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '~/components/reusbales/Input';
import { Button } from '~/components/reusbales/Button';
import { Container } from '~/components/reusbales/Container';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLogin } from '~/hooks/use-auth';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/context/AuthContext';
import { getUser } from '~/services/auth.service';

const loginSchema = z.object({
  username: z.string().min(2, 'username must be at least 2 chars'),
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
      username: '',
      password: '',
    },
  });

  const { login, setUser } = useAuth();
  const { mutate, isPending } = useLogin();
  const { showToast } = useToast();

  const onSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);

    mutate(
      { identifier: data.username, password: data.password },
      {
        onSuccess: async (res: any) => {
          login(res?.data?.token, res?.data?.user);
          console.log(res);
          // const user = await getUser();
          // setUser(user?.data?.user);
          router.push({ pathname: '/(tabs)/home' });
        },
        onError: (err: any) => {
          const firstField = Object.keys(err.errors || {})[0];
          const firstMessage = firstField ? err.errors[firstField] : 'Signup failed';

          showToast({
            type: 'error',
            message: err.message,
            description: firstMessage || 'Please try again later',
          });
        },
      }
    );
  };

  return (
    <Container className="flex-1 bg-white" loading={isPending}>
      <View className="px-2 py-6">
        <View className="mb-8">
          <Pressable onPress={() => router.back()} className="mb-6 flex-row items-center gap-3">
            <Ionicons name="chevron-back" size={22} color="#000000" />
            <Text className="font-clashmedium text-2xl text-gray-900">Sign To Your Account</Text>
          </Pressable>
          <Text className="mt-3 font-jarkataregular text-gray-600">
            Welcome back 🚀! Please enter your credentials to continue.
          </Text>
        </View>

        <View className="gap-4">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <Input
                label="username"
                placeholder="Enter your username"
                leftIcon="person-outline"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                error={errors.username?.message}
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

          <Text className="text-right font-jarkatalight text-sm text-gray-700">
            Forgotten Password?
          </Text>
        </View>

        <View className="my-8 px-2">
          <Button size="lg" className="h-[46px]" onPress={handleSubmit(onSubmit)}>
            Sign In
          </Button>
        </View>
        <View className="flex-row items-center justify-center space-x-1">
          <Text className="font-jarkataregular text-sm text-gray-600">
            Don&apos;t have an account?
          </Text>
          <Link href="/auth/signup" className="font-jarkatamedium text-primary-500">
            Sign Up
          </Link>
        </View>
      </View>
    </Container>
  );
};

export default Login;
