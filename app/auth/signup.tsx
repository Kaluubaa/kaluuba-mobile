import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '~/components/reusbales/Input';
import { Button } from '~/components/reusbales/Button';
import { Container } from '~/components/reusbales/Container';
import { Link, router } from 'expo-router';
import countries from '~/constants/countries.json';
import CountryModal from '~/components/auth/CountryModal';
import { useRegister } from '~/hooks/use-auth';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/context/AuthContext';

const signupSchema = z.object({
  // firstName: z.string().min(2, 'First name must be at least 2 characters'),
  // lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  username: z.string().min(2, 'User name must be atleast 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  country: z
    .object({
      name: z.string(),
      code: z.string(),
      flag: z.string(),
    })
    .nullable(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      country: null,
      password: '',
    },
  });

  const { mutate, isPending } = useRegister();
  const { showToast } = useToast();

  const selectedCountry = watch('country');

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { login, setUser } = useAuth();

  const onSubmit = (data: SignupFormData) => {
    console.log('Form data:', data);
    mutate(
      {
        email: data.email,
        username: data.username,
        password: data.password,
        country: data.country?.name || null,
      },
      {
        onSuccess: (res: any) => {
          console.log('Signup successful:', res);
          setUser(res?.data?.user);
          router.push({ pathname: '/auth/verifyOtp', params: { email: data.email } });
        },
        onError: (err: any) => {
          console.log('bundle bundle', err);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container className="flex-1 bg-white" loading={isPending}>
        <View className="px-2 py-6">
          <View className="mb-8">
            <Pressable onPress={() => router.back()} className="mb-6 flex-row items-center gap-3">
              <Ionicons name="chevron-back" size={22} color="#000000" />
              <Text className="font-clashmedium text-[22px] text-gray-900">Create An Account</Text>
            </Pressable>
            <Text className="mt-3 font-jarkataregular text-gray-600">
              🚀 Ready to join the adventure? Fill in your details and let&apos;s get started!
            </Text>
          </View>

          <ScrollView 
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="gap-4">
            {/* <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <Input
                label="First Name"
                placeholder="Enter your first name"
                leftIcon="person-outline"
                onChangeText={onChange}
                value={value}
                error={errors.firstName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Last Name"
                placeholder="Enter your last name"
                leftIcon="person-outline"
                onChangeText={onChange}
                value={value}
                error={errors.lastName?.message}
              />
            )}
          /> */}

            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="User Name"
                  placeholder="Enter your User name"
                  leftIcon="person-outline"
                  onChangeText={onChange}
                  autoCapitalize="none"
                  value={value}
                  error={errors.username?.message}
                />
              )}
            />

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

            <View>
              <Text className="mb-2 font-jarkatamedium text-sm text-gray-700">Country</Text>
              <TouchableOpacity
                onPress={() => setIsCountryModalVisible(true)}
                className={`flex-row items-center justify-between rounded-lg border p-3 ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}>
                {selectedCountry ? (
                  <>
                    <Text className="mr-3 text-lg">{selectedCountry.flag}</Text>
                    <Text className="flex-1 font-jarkataregular text-gray-900">
                      {selectedCountry.name}
                    </Text>
                  </>
                ) : (
                  <Text className="font-jarkataregular text-gray-500">Select your country</Text>
                )}
                <Ionicons name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>
              {errors.country && (
                <Text className="mt-1 font-jarkataregular text-sm text-red-500">
                  {errors.country.message}
                </Text>
              )}
            </View>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Password"
                  placeholder="Choose a strong password"
                  leftIcon="lock-closed-outline"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />
          </View>

          <View className="my-6 mb-8 px-2">
            <Button size="lg" className="h-[46px]" onPress={handleSubmit(onSubmit)}>
              Create Account
            </Button>
          </View>

          <View className="mt-6 flex-row items-center justify-center space-x-1">
            <Text className="font-jarkataregular text-gray-600">Already have an account?</Text>
            <Link href="/auth/login" className="font-jarkatamedium text-primary-500">
              Sign In
            </Link>
            </View>
          </ScrollView>
        </View>

        <CountryModal
          filteredCountries={filteredCountries}
          isCountryModalVisible={isCountryModalVisible}
          searchQuery={searchQuery}
          setIsCountryModalVisible={setIsCountryModalVisible}
          setSearchQuery={setSearchQuery}
          setSelectedCountry={(country) => setValue('country', country)}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
