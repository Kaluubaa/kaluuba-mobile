import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, showBack = true, className = '' }) => {
  const router = useRouter();
  return (
    <View className={`flex-row items-center py-4 px-2  ${className}`}>
      {showBack && (
        <TouchableOpacity
          onPress={onBack ? onBack : () => router.back()}
          className="mr-2 p-1 rounded-full bg-gray-100"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
      )}
      <Text className="font-clashmedium text-lg text-gray-900" numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

export default Header;