import React from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import BottomSheetContainer from '../reusbales/BottomSheetContainer';
import { Button } from '../reusbales/Button';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '~/context/AuthContext';
import { Share } from 'react-native';



type Props = {
  onClose: () => void;
  usdcAddress: string;
};

const ReceiveSheet = ({ onClose, usdcAddress }: Props) => {
  const { user } = useAuth();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(usdcAddress);
    Alert.alert('Copied', 'Wallet address copied to clipboard');
  };



const handleShare = async () => {
  const message = `Hi, wire my aza with USDC on Base.\nHere's my wallet address: ${usdcAddress}\n\nOr you can use my Kaluuba tag @${user?.username} if you're using the Kaluuba app.`;
  try {
    await Share.share({ message });
  } catch (error) {
    Alert.alert('Error', 'Could not share wallet address.');
  }
};

  if (!usdcAddress) {
    return (
      <BottomSheetContainer title="Deposit USDC" onClose={onClose}>
        <Text className="text-center font-jarkatamedium text-sm text-red-500">
          Error: No wallet address provided
        </Text>
      </BottomSheetContainer>
    );
  }

  return (
    <BottomSheetContainer
      title="Deposit USDC"
      onClose={onClose}
      subtitle={`To receive from another Kaluuba account, ask the sender to scan your code below, or use your kaluuba tag @${user?.username}`}>
      <View className="mx-20 mt-6 flex h-[300px] w-full items-center justify-center rounded-lg bg-gray-100">
        <QRCode value={usdcAddress} size={200} />
      </View>
      <Text className="mt-10 font-jarkataregular text-sm text-gray-500">
        Or you can copy your wallet address
      </Text>
      <TouchableOpacity
        className="mt-4 flex h-10 w-full justify-center rounded-xl"
        onPress={copyToClipboard}>
        <Text className="text-center text-primary-600">{usdcAddress}</Text>
      </TouchableOpacity>
      <View className="flex-row gap-4">
        <Button
          onPress={handleShare}
          className="mt-4 rounded-full bg-gray-100 px-8 text-sm text-black"
          textClassName="text-black">
          Share
        </Button>
        <Button onPress={copyToClipboard} className="mt-4 rounded-full px-8 text-sm">
          Copy
        </Button>
      </View>
    </BottomSheetContainer>
  );
};

export default ReceiveSheet;
