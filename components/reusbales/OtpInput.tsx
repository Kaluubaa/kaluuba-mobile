import React, { useRef, useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
  containerClassName?: string;
}

export const OTPInput = ({
  length = 6,
  value = '',
  onChange,
  error,
  label,
  containerClassName,
}: OTPInputProps) => {
  const [isFocused, setIsFocused] = useState<number>(-1);
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
      onChange?.(cleaned);
      return;
    }

    // Handle single character input
    const newValue = value.split('');
    newValue[index] = text;
    onChange?.(newValue.join(''));

    // Auto focus next input
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    // Handle backspace
    if (event.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

 

  return (
    <View className={twMerge('w-full', containerClassName)}>
      {label && <Text className="font-jarkata-medium mb-2 text-sm text-gray-700">{label}</Text>}

      <Pressable
        className="w-full flex-row justify-between"
        onPress={() => inputRefs.current[0]?.focus()}>
        {Array.from({ length }).map((_, index) => (
          <View
            key={index}
            className={twMerge(
              'mx-1 h-14 w-14 rounded-lg border-2',
              isFocused === index
                ? 'border-primary-500'
                : error
                  ? 'border-red-500'
                  : 'border-gray-300'
            )}>
            <TextInput
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              className="font-jarkata-medium flex-1 text-center text-2xl text-gray-900"
              maxLength={length}
              keyboardType="numeric"
              value={value[index] || ''}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setIsFocused(index)}
              onBlur={() => setIsFocused(-1)}
              selectTextOnFocus
            />
          </View>
        ))}
      </Pressable>

      {error && (
        <View className="mt-2 flex-row items-center gap-1">
          <Text className="font-jarkata-regular text-sm text-red-500">{error}</Text>
        </View>
      )}
    </View>
  );
};
