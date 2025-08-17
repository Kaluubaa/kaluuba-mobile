import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '~/context/AuthContext';

export default function Splash() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    if (!loading) {
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/auth');
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading, isAuthenticated]);

  return (
    <SafeAreaView className="flex-1 bg-primary-600">
      <Animated.View
        className="flex-1 items-center justify-center p-4"
        style={{ opacity: fadeAnim }}>
        <Text className="mb-2 font-clashmedium text-2xl text-white">Kaluuba</Text>
        <View className="mt-4 flex-row gap-2">
          <View className="h-2 w-2 animate-bounce rounded-full bg-primary-300" />
          <View className="h-2 w-2 animate-bounce rounded-full bg-primary-200 delay-100" />
          <View className="h-2 w-2 animate-bounce rounded-full bg-primary-100 delay-200" />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
