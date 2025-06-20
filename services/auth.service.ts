import { LoginInput, RegisterInput, VerifyOtpInput, ResendOtpInput } from '~/types/auth.t';
import { apiPost } from './api';

export const registerUser = async (data: RegisterInput) => {
  return apiPost('/auth/register', data);
};

export const loginUser = async (data: LoginInput) => {
  return apiPost('/auth/login', data);
};

export const verifyOtp = async (data: VerifyOtpInput) => {
  return apiPost('/auth/verify/email', data);
};

export const resendOtp = async (data: ResendOtpInput) => {
  return apiPost('/auth/verify/resend', data);
};
