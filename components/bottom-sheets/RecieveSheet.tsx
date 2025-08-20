import React from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import BottomSheetContainer from '../reusbales/BottomSheetContainer';
import { Button } from '../reusbales/Button';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

type Props = {
  onClose: () => void;
  usdcAddress: string;
};

const ReceiveSheet = ({ onClose, usdcAddress }: Props) => {
  console.log('ReceiveSheet props:', { usdcAddress, onClose });

  const copyToClipboard = async () => {
    if (!usdcAddress) {
      Alert.alert('Error', 'No wallet address provided');
      return;
    }
    await Clipboard.setStringAsync(usdcAddress);
    Alert.alert('Copied', 'Wallet address copied to clipboard');
  };

  if (!usdcAddress) {
    return (
      <BottomSheetContainer title="Deposit USDC" onClose={onClose}>
        <Text className="text-sm font-jarkatamedium text-red-500 text-center">
          Error: No wallet address provided
        </Text>
      </BottomSheetContainer>
    );
  }

  return (
    <BottomSheetContainer
      title="Deposit USDC"
      onClose={onClose}
      subtitle="To receive from another Kaluuba account, ask the sender to scan your code below."
    >
      <View className="mx-20 mt-6 h-[300px] flex items-center justify-center w-full rounded-lg bg-gray-100">
        <QRCode value={usdcAddress} size={200} />
      </View>
      <Text className="mt-10 font-jarkataregular text-sm text-gray-500">
        Or you can copy your wallet address
      </Text>
      <TouchableOpacity
        className="mt-4 flex h-10 w-full justify-center rounded-xl"
        onPress={copyToClipboard}
      >
        <Text className="text-center text-primary-600">{usdcAddress}</Text>
      </TouchableOpacity>
      <View className="flex-row gap-4">
        <Button
          onPress={copyToClipboard}
          className="mt-4 rounded-full bg-gray-100 text-black px-8 text-sm"
          textClassName="text-black"
        >
          Share
        </Button>
        <Button onPress={copyToClipboard} className="mt-4 rounded-full text-sm px-8">
          Copy
        </Button>
      </View>
    </BottomSheetContainer>
  );
};

export default ReceiveSheet;