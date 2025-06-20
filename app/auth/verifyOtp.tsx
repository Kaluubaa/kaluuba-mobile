import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '~/components/reusbales/Button';
import { Container } from '~/components/reusbales/Container';
import { OTPInput } from '~/components/reusbales/OtpInput';
import { useVerifyOtp, useResendOtp } from '~/hooks/use-auth';
import { router, useLocalSearchParams } from 'expo-router';
import { useToast } from '~/context/ToastContext';

const otpSchema = z.object({
  otp: z.string().length(6, 'Enter the 6-digit code'),
});

type OtpFormData = z.infer<typeof otpSchema>;

const VerifyOtp = () => {
  const { email } = useLocalSearchParams();
  const [countdown, setCountdown] = useState(540); // 9 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const { mutate, isPending } = useVerifyOtp();
  const { mutate: resendMutate, isPending: isResending } = useResendOtp();
  const { showToast } = useToast();

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Format countdown to MM:SS
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    if (!canResend) return;

    resendMutate(
      { email: email as string },
      {
        onSuccess: () => {
          showToast({
            type: 'success',
            message: 'Code sent!',
            description: 'A new verification code has been sent to your email.',
          });
          setCountdown(540); // Reset to 9 minutes
          setCanResend(false);
        },
        onError: (err) => {
          showToast({
            type: 'error',
            message: 'Failed to resend',
            description: err.message,
          });
        },
      }
    );
  };

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
          {canResend ? (
            <Button
              variant="outline"
              size="sm"
              className="ml-2 h-auto px-2 py-1"
              onPress={handleResend}
              disabled={isResending}
            >
              {isResending ? 'Sending...' : 'Resend'}
            </Button>
          ) : (
            <Text className="ml-2 font-jarkatamedium text-primary-500">
              {formatCountdown(countdown)}
            </Text>
          )}
        </View>
      </View>
    </Container>
  );
};

export default VerifyOtp;
