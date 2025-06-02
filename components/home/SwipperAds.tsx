import React from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const ads = [
  {
    key: '1',
    title: 'Invite Friends, Earn Rewards!',
    text: 'Share your referral link and get bonuses when friends sign up.',
    image: require('~/assets/images/global.png'),
    backgroundColor: 'bg-primary-50',
  },
  {
    key: '2',
    title: 'Zero Fees This Month',
    text: 'Enjoy free transfers and swaps all month long.',
    image: require('~/assets/images/phone.png'),
    backgroundColor: 'bg-blue-50',
  },
  // Add more ad slides as needed
];

const SwiperAds = () => {
  const { width } = useWindowDimensions();

  const renderSlide = ({ item }: any) => (
    <View className={`overflow-hidden relative h-20 flex-row w-full items-center  rounded-xl p-4 ${item.backgroundColor}`}>
  
      <View className="z-10 w-2/3">
        <Text className="font-clashmedium text-sm text-gray-800 mb-1">{item.title}</Text>
        <Text className="font-jarkatalight text-xs text-gray-600">{item.text}</Text>
      </View>

      <Image
        source={item.image}
        resizeMode="contain"
        className="  bottom-0 h-10 w-10"
      />
    </View>
  );

  return (
    <AppIntroSlider
      data={ads}
      renderItem={renderSlide}
      showNextButton={false}
      showDoneButton={false}
      dotStyle={{ backgroundColor: '#E5E7EB' }}
      activeDotStyle={{ backgroundColor: '#6366F1', width: 16 }}
      style={{ paddingBottom: 10 }}
    />
  );
};

export default SwiperAds;