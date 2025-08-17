export type RegisterInput = {
  email: string;
  username: string;
  password: string;
  country: string | null;
};

export type LoginInput = {
  identifier: string;
  password: string;
};
export type VerifyOtpInput = {
  email: string;
  otp: string;
};
