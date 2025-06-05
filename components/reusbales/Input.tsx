import React from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerClassName,
  inputClassName,
  labelClassName,
  secureTextEntry,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const isPassword = secureTextEntry && !rightIcon;

  return (
    <View className={twMerge('w-full gap-1.5', containerClassName)}>
      {label && (
        <Text className={twMerge('font-jarkatamedium text-sm text-gray-700', labelClassName)}>
          {label}
        </Text>
      )}

      <View className="relative">
        <View
          className={twMerge(
            'flex-row items-center rounded-xl border border-gray-300 bg-white px-3 h-[47px]',
            isFocused && 'border-primary-500',
            error && 'border-red-500',
            inputClassName
          )}>
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={20}
              color={error ? '#ef4444' : isFocused ? '#4c18cc' : '#6b7280'}
              style={{ marginRight: 8 }}
            />
          )}

          <TextInput
            className="font-jarkataregular flex-1 text-base text-gray-900"
            placeholderTextColor="#9ca3af"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={isPassword ? !isPasswordVisible : secureTextEntry}
            {...props}
          />

          {isPassword && (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="ml-2">
              <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color="#6b7280" />
            </TouchableOpacity>
          )}

          {rightIcon && !isPassword && (
            <TouchableOpacity onPress={onRightIconPress} className="ml-2">
              <Ionicons
                name={rightIcon}
                size={20}
                color={error ? '#ef4444' : isFocused ? '#4c18cc' : '#6b7280'}
              />
            </TouchableOpacity>
          )}
        </View>

        {error && (
          <View className="mt-1 flex-row items-center gap-1">
            <Ionicons name="alert-circle" size={16} color="#ef4444" />
            <Text className="font-jarkata-regular text-sm text-red-500">{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
