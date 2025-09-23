import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Animated, Alert } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Container } from '~/components/reusbales/Container';
import Header from '~/components/reusbales/Header';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Button } from '~/components/reusbales/Button';
import { useValidateRecipient } from '~/hooks/use-transactions';
import * as Clipboard from 'expo-clipboard';

const Kaluuba = () => {
  const [kaluubaName, setKaluubaName] = useState('');
  const [valid, setValid] = useState(false);
  const [smartAccountAddress, setSmartAccountAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const handleScanPress = () => {
    router.push('/scan'); // Navigate to your scan page
  };

  const handleContinue = () => {
    router.push({ pathname: '/send/select-coin', params: { kaluubaName, from: 'kaluuba' } });
  };

  const handleCopyAddress = async () => {
    try {
      await Clipboard.setStringAsync(smartAccountAddress);
      Alert.alert('Copied!', 'Address copied to clipboard');
    } catch {
      Alert.alert('Error', 'Failed to copy address');
    }
  };

  const { mutate: validateRecipient } = useValidateRecipient();

  // Animation effects
  useEffect(() => {
    if (valid) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);
    }
  }, [valid, fadeAnim, scaleAnim]);

  // Pulse animation for loading
  useEffect(() => {
    if (isSearching) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isSearching, pulseAnim]);

  useEffect(() => {
    if (!kaluubaName.trim()) {
      setValid(false);
      setSmartAccountAddress('');
      setSearchError('');
      setHasSearched(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchError('');
    setHasSearched(true);

    const handler = setTimeout(() => {
      validateRecipient(kaluubaName, {
        onSuccess: (res: any) => {
          const isValid = res?.data?.valid;
          setValid(isValid);
          setSmartAccountAddress(isValid ? res?.data?.recipientInfo?.smartAccountAddress : '');
          setSearchError(isValid ? '' : 'Kaluuba name not found');
          setIsSearching(false);
        },
        onError: (err) => {
          setValid(false);
          setSearchError('Unable to verify Kaluuba name');
          setIsSearching(false);
          console.log(err);
        },
      });
    }, 800); // Increased debounce time for better UX

    return () => clearTimeout(handler);
  }, [kaluubaName, validateRecipient]);

  return (
    <Container className="flex-1 bg-gray-50 px-2">
      <Header title="Send to kaluuba Wallet" />

      <View className="flex-1">
        <View className="mt-8">
          <Text className="mb-3 font-jarkatamedium text-base text-gray-700">
            Enter Kaluuba username
          </Text>
          <View className={`relative flex-row items-center rounded-xl border px-3 transition-colors ${
            valid ? 'border-green-400 bg-green-50' : 
            searchError ? 'border-red-400 bg-red-50' : 
            isSearching ? 'border-primary-400 bg-primary-50' : 
            'border-gray-200 bg-white'
          }`}>
            <TextInput
              className="flex-1 py-4 font-jarkatamedium text-base text-gray-800"
              placeholder="e.g., john_doe"
              value={kaluubaName}
              onChangeText={setKaluubaName}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
            />
            <View className="ml-2 flex-row items-center">
              {isSearching ? (
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <ActivityIndicator size="small" color="#6366f1" />
                </Animated.View>
              ) : valid ? (
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              ) : hasSearched && searchError ? (
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              ) : (
                <TouchableOpacity onPress={handleScanPress} className="p-1">
                  <Ionicons name="qr-code-outline" size={24} color="#167D7F" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          {/* Status messages */}
          {isSearching && (
            <View className="mt-3 flex-row items-center">
              <ActivityIndicator size="small" color="#6366f1" />
              <Text className="ml-2 font-jarkataregular text-sm text-primary-600">
                Searching for Kaluuba user...
              </Text>
            </View>
          )}
          
          {hasSearched && searchError && (
            <View className="mt-3 flex-row items-center">
              <Ionicons name="alert-circle" size={16} color="#ef4444" />
              <Text className="ml-2 font-jarkataregular text-sm text-red-600">
                {searchError}
              </Text>
            </View>
          )}
          
          {valid && (
            <View className="mt-3 flex-row items-center">
              <Ionicons name="checkmark-circle" size={16} color="#10b981" />
              <Text className="ml-2 font-jarkataregular text-sm text-green-600">
                Kaluuba user found!
              </Text>
            </View>
          )}
        </View>

        {/* Account address section with animation */}
        <Animated.View 
          style={{ 
            opacity: fadeAnim, 
            transform: [{ scale: scaleAnim }] 
          }}
          className="mt-6">
          {valid && (
            <View>
              <Text className="mb-2 px-1 font-jarkataregular text-sm text-gray-600">
                Account address (Auto-generated)
              </Text>
              <View className="relative flex-row items-center rounded-xl border border-green-200 bg-green-50 px-3">
                <TextInput
                  className="flex-1 py-4 font-jarkatamedium text-base text-gray-800"
                  placeholder="Account address"
                  value={smartAccountAddress}
                  autoCapitalize="none"
                  editable={false}
                  selectTextOnFocus={true}
                />
                <TouchableOpacity onPress={handleCopyAddress} className="ml-2 p-1">
                  <Ionicons name="copy-outline" size={20} color="#167D7F" />
                </TouchableOpacity>
              </View>
              <Text className="mt-2 px-1 font-jarkataregular text-xs text-gray-500">
                This address is automatically generated for the Kaluuba user
              </Text>
            </View>
          )}
        </Animated.View>
      </View>

      <View className="mb-6">
        <Button
          className={`h-[50px] w-full ${
            valid && !isSearching 
              ? 'bg-primary-600' 
              : 'bg-gray-300'
          }`}
          onPress={handleContinue}
          disabled={!valid || isSearching || kaluubaName.length === 0}>
          <View className="flex-row items-center justify-center">
            {isSearching ? (
              <>
                <ActivityIndicator size="small" color="white" />
                <Text className="ml-2 font-jarkatamedium text-white">
                  Searching...
                </Text>
              </>
            ) : valid ? (
              <>
                <Ionicons name="arrow-forward" size={20} color="white" />
                <Text className="ml-2 font-jarkatamedium text-white">
                  Continue to Amount
                </Text>
              </>
            ) : (
              <Text className="font-jarkatamedium text-gray-500">
                {kaluubaName.length === 0 ? 'Enter Kaluuba username' : 'Validating...'}
              </Text>
            )}
          </View>
        </Button>
        
        {valid && (
          <Text className="mt-2 text-center font-jarkataregular text-xs text-gray-500">
            Ready to send to @{kaluubaName}
          </Text>
        )}
      </View>
    </Container>
  );
};

export default Kaluuba;
