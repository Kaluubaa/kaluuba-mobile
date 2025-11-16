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
      <View className="flex-1 bg-white px-6 py-10">
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
          <Text className="text-center font-clashmedium text-[26px] leading-[35px] tracking-wider text-gray-800">
            {item.title}
          </Text>

          <Text className="mt-6 text-center font-jarkatalight text-base text-gray-950">
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
                i === activeIndex ? 'w-4 bg-gradient-mid' : 'bg-gray-900'
              }`}
            />
          ))}
        </View>

        <View className="gap-4">
          <Button
            size="lg"
            className="h-[55px] rounded-full"
            textClassName="text-base font-semibold"
            gradient={['#033726', '#064C36', '#0A6045']} // this applies gradient to the button background
            onPress={() => router.push('/auth/login')}
          >
            Get Started
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
