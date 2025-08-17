import { View, Text, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import { images } from '~/constants/images';
import { Button } from '~/components/reusbales/Button';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const slides = [
  {
    key: '1',
    title: `Crypto Payments for a Borderless Creator Economy`,
    text: 'Send and receive payments globally with the speed and security of crypto—no borders, no barriers.',
    image: images.onboarding1,
    backgroundColor: 'bg-primary-50',
  },
  {
    key: '2',
    title: 'Create Invoices, \n Get Paid in Any Currency',
    text: 'Create and send professional invoices to clients worldwide in seconds, all from one platform.',
    image: images.onboarding2,
    backgroundColor: 'bg-blue-50',
  },
  {
    key: '3',
    title: 'Track And Verify \n Payments Seamlessly',
    text: 'Monitor invoice status, send reminders, and manage your global payments securely and easily.',
    image: images.onboarding,
    backgroundColor: 'bg-blue-50',
  },
];

const AuthIndex = () => {
  const { width } = useWindowDimensions();

  const renderSlide = ({
    item,
  }: {
    item: { key: string; title: string; text: string; image: any; backgroundColor: string };
  }) => {
    return (
      <View className="flex-1 bg-black px-6 py-10">
        <View
          className={`relative h-[65%] w-full items-center justify-center overflow-hidden rounded-xl ${item.backgroundColor}`}>
          <Image
            source={item.image}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
            className=""
          />
        </View>

        <View className="mt-6 flex-1 justify-center px-4">
          <Text className="text-center font-clashmedium text-[26px] leading-relaxed tracking-wider text-gray-200">
            {item.title}
          </Text>

          <Text className="mt-6 text-center font-jarkatalight text-base text-gray-300">
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  const renderPagination = (activeIndex: number) => {
    return (
      <View className="mb-10 px-6">
        <View className="mb-8 flex-row justify-center gap-2">
          {slides.map((_, i) => (
            <View
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === activeIndex ? 'w-4 bg-primary-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </View>

        <View className="gap-4">
          <Button
            size="lg"
            className="h-[55px] gap-10 rounded-full"
            textClassName="flex-row items-center text-base font-semibold"
            onPress={() => router.push('/auth/authoption')}>
            Get Started
            {/* <Ionicons name="arrow-forward" size={20} color="#ffffff" className="ml-2" /> */}
          </Button>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
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
