import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
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
}: ButtonProps) => {
  const baseStyles = 'rounded-lg flex-row items-center justify-center';

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

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50',
        className
      )}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#0c89eb'} size="small" />
      ) : (
        <Text
          className={twMerge(
            textBaseStyles,
            textVariantStyles[variant],
            textSizeStyles[size],
            textClassName
          )}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};
