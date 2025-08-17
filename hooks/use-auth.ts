import { useMutation, useQuery } from '@tanstack/react-query';
import { registerUser, loginUser, verifyOtp, getUser } from '~/services/auth.service';
import { LoginInput, RegisterInput, VerifyOtpInput } from '~/types/auth.t';
import { ProfileResponse } from '~/types/user';

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

export const useProfile = () => {
  return useQuery<ProfileResponse>({
    queryKey: ['profile'],
    queryFn: getUser,
  });
}; 