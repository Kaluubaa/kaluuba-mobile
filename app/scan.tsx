import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Container } from '~/components/reusbales/Container';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from '~/components/reusbales/Button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';

const Scan = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  console.log('Camera Permission:', cameraPermission);

  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  // Animate scanning line
  useEffect(() => {
    if (!scanned) {
      const animateScanLine = () => {
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => animateScanLine());
      };
      animateScanLine();
    }
  }, [scanned, scanLineAnim]);

  // Handle barcode scanning
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      setScannedData(data);
    }
  };

  if (!cameraPermission) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-lg text-white">Requesting camera permission...</Text>
      </View>
    );
  }

  if (!cameraPermission.granted) {
    return (
      <View className="flex-1 items-center justify-center gap-2 px-8">
        <Text className="font-clashmedium text-lg">Please Grant Camera Permision!</Text>
        {cameraPermission.canAskAgain ? (
          <>
            <Text className="text-center font-jarkataregular text-gray-500">
              To continue using the{' '}
              <Text className="font-jarkatasemibold text-primary-600">Kaluuba Scan</Text> feature,
              we need access to your camera. You can enable it by granting permission below.
            </Text>
            <Button onPress={requestCameraPermission} className="mt-6 h-[45px] w-full">
              Continue!
            </Button>
          </>
        ) : (
          <Text className="text-center font-jarkataregular text-gray-500">
            Camera access is required to use the{' '}
            <Text className="font-jarkatasemibold text-primary-600">Kaluuba Scan</Text> feature.
            Please go to your device settings {'>'} Apps {'>'} Permissions {'>'} Camera and enable
            access for this app.
          </Text>
        )}
      </View>
    );
  }

  return (
    <View className="flex-1">
      {!scanned ? (
        <View className="relative flex-1">
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
            onBarcodeScanned={handleBarCodeScanned}
          />

          {/* Header Overlay */}
          <View className="absolute left-0 right-0 top-0 z-10 px-6 pt-12">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                className="h-10 w-10 items-center justify-center rounded-full bg-black/30"
                onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <View className="flex-1 items-center">
                <Text className="font-clashmedium text-xl text-white">Scan to Pay</Text>
                <Text className="mt-1 font-jarkataregular text-sm text-white/80">
                  Position QR code within the frame
                </Text>
              </View>
              <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-black/30">
                <Ionicons name="flash" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Scanning Frame Overlay */}
          <View className="absolute inset-0 z-10 items-center justify-center">
            {/* Dark overlay with transparent center */}
            <View className="absolute inset-0 bg-black/50">
              <View className="flex-1" />
              <View className="h-64 flex-row">
                <View className="flex-1 bg-black/50" />
                <View className="w-64" />
                <View className="flex-1 bg-black/50" />
              </View>
              <View className="flex-1" />
            </View>

            {/* Scanning frame */}
            <View className="relative h-64 w-64">
              {/* Corner indicators */}
              <View className="absolute left-0 top-0 h-8 w-8 rounded-tl-lg border-l-4 border-t-4 border-white" />
              <View className="absolute right-0 top-0 h-8 w-8 rounded-tr-lg border-r-4 border-t-4 border-white" />
              <View className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-4 border-l-4 border-white" />
              <View className="absolute bottom-0 right-0 h-8 w-8 rounded-br-lg border-b-4 border-r-4 border-white" />

              {/* Animated scanning line */}
              <Animated.View
                className="absolute left-0 right-0 h-0.5 bg-primary-500"
                style={{
                  top: scanLineAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                  opacity: scanLineAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 1, 0.3],
                  }),
                }}
              />
            </View>
          </View>

          {/* Bottom Instructions */}
          <View className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12">
            <View className="items-center rounded-2xl bg-black/30 p-4">
              <Ionicons name="qr-code-outline" size={32} color="white" />
              <Text className="mt-2 text-center font-jarkatamedium text-white">
                Scan QR code to send payment
              </Text>
              <Text className="mt-1 text-center font-jarkataregular text-sm text-white/70">
                Make sure the QR code is clearly visible within the frame
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View className="flex-1">
          {/* Header with X button */}
          <View className="flex-row items-center justify-between px-6 pb-4 pt-12">
            <View className="w-10" />
            <Text className="font-clashmedium text-lg text-gray-800">Payment Details</Text>
            <TouchableOpacity
              className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              onPress={() => router.push('/(tabs)/home')}>
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <View className="flex-1 items-center justify-center px-6">
            <View className="mb-8 items-center">
              <View className="h-20 w-20 items-center justify-center">
                <LottieView
                  autoPlay
                  loop={false}
                  source={require('../assets/animations/success.json')}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
              <Text className="mb-2 font-clashmedium text-xl text-gray-800">Details Detected!</Text>
              <Text className="mb-1 text-center font-jarkatamedium font-medium text-black/70">
                Payable Adress
              </Text>
              <Text className="text-center font-jarkatalight font-medium text-black/70">
                {scannedData || 'No data'}
              </Text>
            </View>

            <View className="w-full gap-3">
              <Button onPress={() => {}} className="h-[48px] w-full" size="md">
                <Text className="font-jarkatamedium text-white">Continue Payment</Text>
              </Button>

              <TouchableOpacity
                className="h-[48px] w-full items-center justify-center rounded-xl border border-black/20"
                onPress={() => setScanned(false)}>
                <Text className="font-jarkatamedium text-black">Scan again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Scan;
