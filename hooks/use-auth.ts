import { useMutation } from '@tanstack/react-query';
import { registerUser, loginUser, verifyOtp } from '~/services/auth.service';
import { LoginInput, RegisterInput, VerifyOtpInput } from '~/types/auth.t';

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginInput) => loginUser(data),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (data: VerifyOtpInput) => verifyOtp(data),
  });
}
