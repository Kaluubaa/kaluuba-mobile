import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container } from '~/components/reusbales/Container';
import Header from '~/components/reusbales/Header';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Button } from '~/components/reusbales/Button';
import { useValidateRecipient } from '~/hooks/use-transactions';
import { isValid } from 'date-fns';

const Kaluuba = () => {
  const [kaluubaName, setKaluubaName] = useState('');
  const [valid, setValid] = useState(false);
  const [smartAccountAddress, setSmartAccountAddress] = useState('');

  const handleScanPress = () => {
    router.push('/scan'); // Navigate to your scan page
  };

  const handleContinue = () => {
    router.push({ pathname: '/send/select-coin', params: { kaluubaName, from: 'kaluuba' } });
  };

  const { mutate: validateRecipient, isPending } = useValidateRecipient();

  useEffect(() => {
    if (!kaluubaName) return;
    const handler = setTimeout(() => {
      validateRecipient(kaluubaName, {
        onSuccess: (res: any) => {
          const valid = res?.data?.valid;
          setValid(res?.data?.valid);

          setSmartAccountAddress(valid ? res?.data?.recipientInfo?.smartAccountAddress : '');
          console.log(res?.data);
        },
        onError: (err) => {
          setValid(false);
          console.log(err);
        },
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [kaluubaName, validateRecipient]);

  return (
    <Container className="flex-1 bg-gray-50 px-2">
      <Header title="Send to kaluuba Wallet" />

      <View className="flex-1">
        <View className="mt-8">
          {/* <Text className="mb-2 font-jarkataregular text-gray-600">Enter Kaluuba Name</Text> */}
          <View className="relative flex-row items-center rounded-xl border border-gray-200  px-3">
            <TextInput
              className="flex-1 py-4 font-jarkatamedium text-base text-gray-800"
              placeholder="Enter Kaluuba name"
              value={kaluubaName}
              onChangeText={setKaluubaName}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={handleScanPress} className="ml-2 p-2">
              <Ionicons name="qr-code-outline" size={24} color="#167D7F" />
            </TouchableOpacity>
          </View>
        </View>

        {isPending ? (
          <Text className="my-6 text-center font-jarkatamedium">Validating...</Text>
        ) : (
          valid && (
            <View className="mt-6">
              <Text className="mb-2 px-1 font-jarkataregular text-sm text-gray-600">
                Account address (Auto-generated)
              </Text>
              <View className="relative flex-row items-center rounded-xl border border-gray-200 bg-gray-200  px-3">
                <TextInput
                  className="flex-1 py-4 font-jarkatamedium text-base text-gray-800"
                  placeholder="Account address"
                  value={smartAccountAddress}
                  //   onChangeText={setSmartAccountAddress}
                  autoCapitalize="none"
                  aria-disabled
                />
              </View>
            </View>
          )
        )}
      </View>

      <Button
        className="mb-6 h-[50px] w-full"
        onPress={handleContinue}
        disabled={smartAccountAddress.length === 0 || isPending || kaluubaName.length === 0}>
        Continue
      </Button>
    </Container>
  );
};

export default Kaluuba;
