import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Container } from '~/components/reusbales/Container';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from '~/components/reusbales/Button';

const Scan = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  console.log('Camera Permission:', cameraPermission);

  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  // Handle barcode scanning
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setScannedData(data);
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
    <View className="flex-1 ">
      {/* <Text className="text-center font-clashmedium text-lg tracking-wider">Kaluuba Scan</Text>
        <Text className="mt-2 text-center font-jarkataregular text-sm text-gray-500">{`Scan QR Code to send payment to a  Kaluuba account,\n or to pay invoice`}</Text> */}
      {/* <View className="flex-1"> </View> */}
      {!scanned ? (
        <CameraView
          className="flex-1 border"
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={handleBarCodeScanned}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="mb-4 text-lg text-white">Scanned Data: {scannedData || 'No data'}</Text>
          <TouchableOpacity
            className="rounded-lg bg-blue-500 px-6 py-3"
            onPress={() => setScanned(false)}>
            <Text className="text-base font-bold text-white">Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Scan;
