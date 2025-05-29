
import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

interface LoaderProps {
  loading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <View className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/30">
      <View className="h-24 w-24">
        <LottieView
          source={require('../../assets/animations/loading-drop.json')}
          autoPlay
          loop
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </View>
  );
};
