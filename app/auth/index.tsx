import { View, Text, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import { images } from '~/constants/images';
import { Button } from '~/components/reusbales/Button';
import { router } from 'expo-router';

const slides = [
    {
        key: '1',
        title: `Borderless Crypto \n Powered Payments`,
        text: 'Send and receive payments globally with the speed and security of crypto—no borders, no barriers.',
        image: images.phone,
        backgroundColor: 'bg-primary-50',
    },
    {
        key: '2',
        title: 'Create Invoices, \n Get Paid in Any Currency',
        text: 'Create and send professional invoices to clients worldwide in seconds, all from one platform.',
        image: images.onboarding,
        backgroundColor: 'bg-blue-50'
    },
    {
        key: '3',
        title: 'Track And Verify \n Payments Seamlessly',
        text: 'Monitor invoice status, send reminders, and manage your global payments securely and easily.',
        image: images.phone, 
        backgroundColor: 'bg-green-50',
    },
];


const AuthIndex = () => {
  const { width } = useWindowDimensions();

  const renderSlide = ({
    item,
  }: {
    item: { key: string; title: string; text: string; image: any, backgroundColor: string; };
  }) => {
    return (
      <View className="flex-1 px-4 py-8">
        <View className={`overflow-hidden relative h-[65%] w-full items-center justify-center rounded-xl p-4 ${item.backgroundColor}`}>
          <Image
            source={item.image}
            style={{
              width: width * 0.9,
              height: '100%',
            }}
            resizeMode="contain"
            className="absolute -bottom-6"
          />
        </View>

        <View className="mt-6 flex-1 justify-center px-4">
          <Text className="font-clashmedium text-center text-[26px] leading-normal text-gray-800">{item.title}</Text>

          <Text className="font-jarkatalight mt-6 text-center text-base text-gray-600">
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  const renderPagination = (activeIndex: number) => {
    return (
      <View className="mb-6 px-6">
        <View className="mb-8 flex-row justify-center gap-2">
          {slides.map((_, i) => (
            <View
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === activeIndex ? 'bg-primary-500 w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </View>

        <View className="gap-4">
          <Button size="lg" className="h-[50px]" onPress={() => router.push('/auth/signup')}>
            Create Account
          </Button>

          <Button variant="outline" size="lg" className="h-[50px]"  onPress={() => router.push('/auth/login')}>
            Sign In
          </Button>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppIntroSlider
        data={slides}
        renderItem={renderSlide}
        renderPagination={renderPagination}
        showNextButton={false}
        showDoneButton={false}
      />
    </SafeAreaView>
  );
};

export default AuthIndex;
