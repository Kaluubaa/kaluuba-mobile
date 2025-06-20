import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const isAuthenticated = false;

export default function Splash() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/auth');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, router]);



  return (
    <SafeAreaView className="bg-primary-500 flex-1">
      <Animated.View
        className="flex-1 items-center justify-center p-4"
        style={{ opacity: fadeAnim }}>
        <Text className="font-clashmedium mb-2 text-2xl text-gray-100">Kaluuba</Text>
        <View className="mt-4 flex-row gap-2">
          <View className="bg-primary-300 h-2 w-2 animate-bounce rounded-full" />
          <View className="bg-primary-200 h-2 w-2 animate-bounce rounded-full delay-100" />
          <View className="bg-primary-100 h-2 w-2 animate-bounce rounded-full delay-200" />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
