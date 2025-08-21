import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
};

const BottomSheetContainer = ({ title = '', subtitle, children, className = '', onClose }: Props) => (
  <BottomSheetView className={`flex-1 items-center justify-center p-6 ${className}`}>
    {onClose && (
      <TouchableOpacity
        onPress={onClose}
        style={{ position: 'absolute', top: 16, left: 20, zIndex: 10, opacity: 0.5 }}
        hitSlop={12}
      >
        <Ionicons name="close" size={24} color="#222" />
      </TouchableOpacity>
    )}
    <Text className="font-jarkatasemibold text-lg mb-2">{title}</Text>
    {subtitle && (
      <Text className="text-sm font-jarkatamedium text-gray-500 mb-4 text-center">
        {subtitle}
      </Text>
    )}
    {children}
  </BottomSheetView>
);

export default BottomSheetContainer;