import { View, Text, TouchableOpacity, Image, Alert, Share } from 'react-native';
import React from 'react';
import { Container } from '~/components/reusbales/Container';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '~/context/AuthContext';
import * as Clipboard from 'expo-clipboard';

const Recieve = () => {
  const { user } = useAuth();
  const walletAddress = user?.smartAccountAddress || '';

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(walletAddress);
      Alert.alert('Copied!', 'Wallet address copied to clipboard');
    } catch {
      Alert.alert('Error', 'Failed to copy address');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Send USDC to my wallet: ${walletAddress}`,
        title: 'My USDC Wallet Address',
      });
    } catch {
      Alert.alert('Error', 'Failed to share address');
    }
  };

  return (
    <Container className="flex-1  px-2 py-2">
      <View className="flex-row items-center  gap-4">
        <TouchableOpacity onPress={() => router.back()} className="w-1/3">
          <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>
        <Text className=" font-jarkatasemibold text-xl tracking-wider text-black">
          Receive USDC
        </Text>
      </View>

      <View className="mt-10 flex-1 items-center gap-6">
        <View>
          <View className="w-full flex-row items-center gap-3 rounded-full bg-white px-3 py-1.5 ">
            <View className="size-5 overflow-hidden rounded-full bg-black">
              <Image
                source={{ uri: 'https://blockfuselabs.com/assets/Base_Network_Logo-CkqbCHyg.png' }}
                className="h-full w-full"
              />
            </View>
            <Text className=" font-jarkatamedium text-sm text-gray-600">Base</Text>

            <Ionicons name="chevron-down" size={15} color={'#6B7280'} />
          </View>
        </View>

        <View className="flex-row items-start gap-3 rounded-lg bg-blue-50 p-4">
          <Ionicons name="information-circle" size={20} color="#3B82F6" className="py-0.5" />
          <Text className="flex-1 font-jarkataregular text-sm text-gray-600">
            Deposit USDC from any chain. It will settle automatically on the selected network.
          </Text>
        </View>

        <View className="size-[230px] items-center justify-center rounded-3xl border border-gray-100 bg-white">
          <QRCode value={walletAddress} size={180} />
        </View>

        <View className="w-full flex-1 gap-4">
          <View className="mb-4 items-center">
            <Text className="mb-2 font-jarkatasemibold font-semibold text-gray-900 ">
              Your USDC Address
            </Text>
            <Text className="text-center font-jarkataregular text-xs text-gray-700">
              {walletAddress || 'No address available'}
            </Text>
          </View>

          <View className="flex-row justify-center gap-3">
            <TouchableOpacity 
              onPress={handleShare}
              className="w-[100px] flex-row items-center justify-center gap-2 rounded-full bg-primary-500/10 px-3 py-2"
            >
              <Ionicons name="share-outline" size={16} color="#3B82F6" />
              <Text className="text-primary font-jarkatamedium text-sm">Share</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleCopy}
              className="w-[100px] flex-row items-center justify-center gap-2 rounded-full bg-primary-500 px-3 py-2"
            >
              <Ionicons name="copy-outline" size={16} color="white" />
              <Text className="font-jarkatamedium text-sm text-white">Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Recieve;
