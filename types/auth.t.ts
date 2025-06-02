export type RegisterInput = {
    email: string;
    username: string;
    password: string;
};

export type LoginInput = {
    username: string;
    password: string;
};
export type VerifyOtpInput = {
    email: string;
    otp: string;
};