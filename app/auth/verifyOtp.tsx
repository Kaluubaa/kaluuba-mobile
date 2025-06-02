import React from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '~/components/reusbales/Button';
import { Container } from '~/components/reusbales/Container';
import { OTPInput } from '~/components/reusbales/OtpInput';
import { useVerifyOtp } from '~/hooks/use-auth';
import { router, useLocalSearchParams } from 'expo-router';
import { useToast } from '~/context/ToastContext';

const otpSchema = z.object({
  otp: z.string().length(6, 'Enter the 6-digit code'),
});

type OtpFormData = z.infer<typeof otpSchema>;

const VerifyOtp = () => {
  const { email } = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const { mutate, isPending } = useVerifyOtp();
    const { showToast } = useToast();
  
  const onSubmit = (data: OtpFormData) => {
    console.log('OTP submitted:', data.otp);
    mutate(
      { email: email as string, otp: data.otp },
      {
        onSuccess: (res) => {
          console.log(res);
          router.push('/auth/success');
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <Container className="flex-1 bg-white" loading={isPending}>
      <View className="px-4 py-8">
        <Text className="mb-2 font-clashmedium text-2xl text-gray-900">Verify Code</Text>
        <Text className="mb-8 font-jarkataregular text-gray-600">
          Enter the 6-digit code sent to {email}
        </Text>

        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, value } }) => (
            <OTPInput
              length={6}
              value={value}
              onChange={onChange}
              error={errors.otp?.message}
              label=""
              containerClassName="mb-6"
            />
          )}
        />

        <Button size="lg" className="mt-4 h-[45px]" onPress={handleSubmit(onSubmit)}>
          Verify
        </Button>

        <View className="mt-8 flex-row items-center justify-center">
          <Text className="font-jarkataregular text-gray-600">Didn&apos;t get a code?</Text>
          <Button variant="outline" size="sm" className="ml-2 h-auto px-2 py-1" onPress={() => {}}>
            Resend
          </Button>
        </View>
      </View>
    </Container>
  );
};

export default VerifyOtp;
