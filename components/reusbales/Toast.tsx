import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';

interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, description, duration = 3000, onClose }) => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  const TOAST_CONFIG = {
    success: {
      gradient: 'bg-green-500 ',
      icon: 'check-circle',
      iconColor: 'text-green-200',
      glow: 'shadow-green-500/50',
    },
    error: {
      gradient: 'bg-red-500 ',
      icon: 'exclamation-circle',
      iconColor: 'text-red-200',
      glow: 'shadow-red-500/50',
    },
    info: {
      gradient: 'bg-blue-500',
      icon: 'info-circle',
      iconColor: 'text-blue-200',
      glow: 'shadow-blue-500/50',
    },
    warning: {
      gradient: 'bg-yellow-500',
      icon: 'exclamation-triangle',
      iconColor: 'text-yellow-200',
      glow: 'shadow-yellow-500/50',
    },
  };

  const config = TOAST_CONFIG[type];

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, { duration: 400 }),
    transform: [
      { translateY: withSpring(translateY.value, { damping: 15, stiffness: 100 }) },
      { scale: withSpring(scale.value, { damping: 20, stiffness: 120 }) },
    ],
  }));

  useEffect(() => {
    opacity.value = 1;
    translateY.value = 0;
    scale.value = 1;

    const timer = setTimeout(() => {
      opacity.value = 0;
      translateY.value = 50;
      scale.value = 0.9;
      setTimeout(() => {
        onClose?.();
      }, 400);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <Animated.View
      style={animatedStyle}
      entering={FadeInDown.springify().damping(15).stiffness(100)}
      exiting={FadeOutUp.springify().damping(15).stiffness(100)}
      className={`absolute bottom-10 w-11/12 mx-4 rounded-2xl p-4 flex-row items-center bg-gradient-to-r ${config.gradient} shadow-lg ${config.glow} border border-white/10 backdrop-blur-md`}
    >
      <FontAwesome5 name={config.icon} size={26} className={`mr-4 ${config.iconColor}`} />
      <View className="flex-1">
        <Text className="text-white text-lg font-bold tracking-tight">{message}</Text>
        {description && (
          <Text className="text-white/90 text-sm mt-1 font-medium">{description}</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          opacity.value = 0;
          translateY.value = 50;
          scale.value = 0.9;
          setTimeout(() => {
            onClose?.();
          }, 400);
        }}
      >
        <FontAwesome5 name="times" size={22} className="text-white/80" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;