import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
  gradient?: string[]; // optional gradient for button background
}

export const Button = ({
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  textClassName = '',
  children,
  gradient,
}: ButtonProps) => {
  const baseStyles = 'rounded-lg flex-row items-center justify-center overflow-hidden'; // overflow-hidden for gradient
  const variantStyles = {
    primary: 'bg-primary-500 active:bg-primary-600',
    secondary: 'bg-accent-100 active:bg-accent-200',
    outline: 'border border-primary-500 bg-transparent active:bg-primary-50',
  };

  const sizeStyles = {
    sm: 'px-3 py-2',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3',
  };

  const textBaseStyles = 'text-center flex-row items-center font-jarkatamedium';
  const textVariantStyles = {
    primary: 'text-white',
    secondary: 'text-primary-700',
    outline: 'text-primary-500',
  };
  const textSizeStyles = {
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-sm',
  };

  const content = loading ? (
    <ActivityIndicator color={variant === 'primary' ? 'white' : '#0c89eb'} size="small" />
  ) : (
    <Text
      className={twMerge(
        textBaseStyles,
        textVariantStyles[variant],
        textSizeStyles[size],
        textClassName
      )}
    >
      {children}
    </Text>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={twMerge(baseStyles, sizeStyles[size], disabled && 'opacity-50', className)}
    >
      {gradient ? (
        <LinearGradient
          colors={gradient as [string, string, ...string[]]} // type-safe assertion
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        className={twMerge(baseStyles, sizeStyles[size], disabled && 'opacity-50', className)}
        >
          {content}
        </LinearGradient>
      ) : (
        <View className={twMerge(variantStyles[variant], 'flex-1 justify-center items-center')}>
          {content}
        </View>
      )}
    </TouchableOpacity>
  );
};
