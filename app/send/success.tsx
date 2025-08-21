import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Container } from '~/components/reusbales/Container';
import { Button } from '~/components/reusbales/Button';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const Success = () => {
  return (
    <Container className="flex-1 px-6 py-4">
      <View className="flex-1 px-4">
        <View className="w-full flex-1 items-center justify-center gap-4">
          <View className="h-32 w-32 items-center justify-center">
            <LottieView
              autoPlay
              loop={false}
              source={require('../../assets/animations/success.json')}
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <Text className=" mb-4 text-center font-clashmedium text-lg tracking-wider text-gray-600">
            Transaction Successful!
          </Text>

          
        </View>

        <Button
          size="lg"
          className="mt-auto w-full rounded-full bg-teal-800 px-4 py-4 "
          textClassName="font-sofia-regular text-base text-white"
          onPress={() => router.replace('/(tabs)/home')}>
          Go to Home
        </Button>
      </View>
    </Container>
  );
};

export default Success;
