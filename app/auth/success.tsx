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
            Here&apos;s your wallet!
          </Text>

          <View className="gap-4">
            <View className=" flex-row items-center gap-6 rounded-full bg-white  px-4 py-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-teal-800/20">
                <Ionicons name="wallet" size={18} color="#115e59" className="text-teal-800" />
              </View>

              <View className="flex-1">
                <Text className="font-jarkataregular text-xs text-gray-500">
                  Your wallet address
                </Text>
                <Text className="font-jarkataregular text-sm text-gray-900">0x12...89AB</Text>
              </View>

              <TouchableOpacity>
                <Ionicons
                  name="copy-outline"
                  size={18}
                  color="#1e40af"
                  className="text-blue-800"
                  onPress={() => {
                    // Copy the address to clipboard
                  }}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-6 rounded-full  px-4 py-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-800/20">
                <Ionicons
                  name="shield-checkmark"
                  size={18}
                  color="#1e40af"
                  className="text-blue-800"
                />
              </View>

              <Text className="pr-4 font-jarkataregular text-sm text-gray-600">
                The Address above , acts like an account number for recieving funds
              </Text>
            </View>

            {/* First notice */}
            <View className=" flex-row gap-6 rounded-full px-4 py-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-orange-500/20">
                <Ionicons
                  name="information-circle"
                  size={18}
                  color="#f97316"
                  className="text-orange-500"
                />
              </View>

              <Text className="font-sofia-light pr-4 text-sm text-gray-600">
                Always verify transaction details before confirming any transfers
              </Text>
            </View>

            {/* Second notice */}
            <View className=" flex-row gap-6 rounded-full px-4 py-3">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-green-600/20">
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#16a34a"
                  className="text-green-600"
                />
              </View>

              <View>
                <Text className="font-sofia-light px-auto text-sm text-gray-600">
                  We help manage, private keys but Your funds are secured with industry-standard
                  encryption
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Button
          size="lg"
          className="mt-auto w-full rounded-full bg-teal-800 px-4 py-4 "
          textClassName="font-sofia-regular text-base text-white"
          onPress={() => router.replace('/(tabs)/home')}>
          continue
        </Button>
      </View>
    </Container>
  );
};

export default Success;
