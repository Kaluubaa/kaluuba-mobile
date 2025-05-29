export type RegisterInput = {
    email: string;
    username: string;
    password: string;
};

export type LoginInput = {
    email: string;
    password: string;
};
export type VerifyOtpInput = {
    email: string;
    otp: string;
};