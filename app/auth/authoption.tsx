import { View, Text, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { images } from '~/constants/images';
import { Container } from '~/components/reusbales/Container';
import { Button } from '~/components/reusbales/Button';
import { router } from 'expo-router';

const AuthOption = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container className="w-full flex-1 items-center justify-center bg-white px-4 py-16">
        {/* <Text>AuthOption</Text> */}
        <View className=" h-[50%] overflow-hidden rounded-lg bg-black">
          <Image source={images.onboarding3} className="h-full w-full" resizeMode="cover" />
        </View>

        <View className=" mt-16 w-full flex-1 items-center justify-center gap-2  ">
          <Text className="text-center font-clashmedium text-2xl  text-gray-900">
            Welcome to Kaluuba
          </Text>
          <Text className="mt-4 text-center font-jarkatalight text-base text-gray-500">
            New here? Start by creating your account. Already with us? Simply log back in. Your
            journey to borderless payments begins here.
          </Text>
        </View>

        <View className="mt-8  flex-1 items-center gap-4">
          <Button className="h-[50px] w-full rounded-xl" onPress={() => router.push('/auth/login')}>
            Signin
          </Button>
          <Button
            variant="outline"
            className="h-[50px] w-full rounded-xl"
            onPress={() => router.push('/auth/signup')}>
            Create Account
          </Button>
        </View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default AuthOption;
