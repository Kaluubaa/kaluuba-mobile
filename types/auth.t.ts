export type RegisterInput = {
  email: string;
  username: string;
  password: string;
  country: string | null;
};

export type LoginInput = {
  username: string;
  password: string;
};
export type VerifyOtpInput = {
  email: string;
  otp: string;
};
