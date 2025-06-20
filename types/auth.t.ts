export type RegisterInput = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
};

export type LoginInput = {
  username: string;
  password: string;
};

export type VerifyOtpInput = {
  email: string;
  otp: string;
};

export type ResendOtpInput = {
  email: string;
};
