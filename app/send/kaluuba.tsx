import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useValidateRecipient } from '~/hooks/use-transactions';

const Kaluuba = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [kaluubaTag, setKaluubaTag] = useState('');
  const [valid, setValid] = useState(false);
  const [smartAccountAddress, setSmartAccountAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  
  const { mutate: validateRecipient } = useValidateRecipient();

  const handleNewRecipient = () => {
    setShowTagInput(true);
  };

  const handleContinue = () => {
    if (valid && kaluubaTag.trim()) {
      router.push({ pathname: '/send/amount', params: { kaluubaName: kaluubaTag, from: 'kaluuba', coin: 'USDC' } });
    }
  };

  // Validate when typing kaluuba tag (debounced)
  useEffect(() => {
    if (!showTagInput) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const tag = kaluubaTag.trim();
    if (!tag) {
      setValid(false);
      setSmartAccountAddress('');
      setIsSearching(false);
      setHasSearched(false);
      setSearchError('');
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setSearchError('');

    debounceRef.current = setTimeout(() => {
      validateRecipient(tag, {
        onSuccess: (res: any) => {
          const isValid = res?.data?.valid;
          setValid(!!isValid);
          setSmartAccountAddress(isValid ? res?.data?.recipientInfo?.smartAccountAddress : '');
          setSearchError(isValid ? '' : 'Kaluuba tag not found');
          setIsSearching(false);
        },
        onError: () => {
          setValid(false);
          setSmartAccountAddress('');
          setSearchError('Unable to verify Kaluuba tag');
          setIsSearching(false);
        },
      });
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [kaluubaTag, showTagInput, validateRecipient]);

  if (showTagInput) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white">
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          
          <View className="flex-1 px-6 pt-4">
          <View className="mb-8 flex-col gap-3">
            <TouchableOpacity 
              onPress={() => setShowTagInput(false)}
              className="mr-4"
            >
              <Ionicons name="arrow-back" size={22} color="#000" />
            </TouchableOpacity>
            <Text className="text-[22px] font-semibold text-black">
              Send to a Kaluuba Tag
            </Text>
          </View>

          <View className="mb-8">
            <Text className="text-base text-gray-600 mb-6">
              Enter Kaluuba user&apos;s tag
            </Text>
            
            <View className="mb-2">
              <Text className="text-sm font-medium text-black mb-2">
                Kaluuba Tag
          </Text>
              <View className={`flex-row items-center rounded-xl border px-4 py-4 ${
            valid ? 'border-green-400 bg-green-50' : 
            searchError ? 'border-red-400 bg-red-50' : 
                isSearching ? 'border-[#68C8CA] bg-[#F0FBFB]' :
            'border-gray-200 bg-white'
          }`}>
                <Text className="text-gray-400 text-lg mr-2">@</Text>
            <TextInput
                  className="flex-1 text-base text-black"
                  placeholder="Enter Kaluuba Tag"
                  placeholderTextColor="#9CA3AF"
                  value={kaluubaTag}
                  onChangeText={setKaluubaTag}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
            />
                <View className="ml-2">
              {isSearching ? (
                    <ActivityIndicator size="small" color="#306B4F" />
              ) : valid ? (
                    <Ionicons name="checkmark-circle" size={22} color="#10b981" />
              ) : hasSearched && searchError ? (
                    <Ionicons name="close-circle" size={22} color="#ef4444" />
                  ) : null}
                </View>
              </View>

              {isSearching && (
                <Text className="mt-2 text-sm text-primary-500">Validating tag…</Text>
              )}
              {hasSearched && searchError ? (
                <Text className="mt-2 text-sm text-red-600">{searchError}</Text>
              ) : null}
            </View>

            {valid && smartAccountAddress ? (
              <View className="mt-4">
                <Text className="mb-2 text-xs text-gray-600">Resolved address</Text>
                <View className="rounded-xl border border-gray-200 bg-gray-50 opacity-60 px-4 py-3">
                  <Text className="text-sm text-gray-800" numberOfLines={1}>
                    {smartAccountAddress}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
          
          <View className="mt-auto mb-6">
            <TouchableOpacity
              onPress={handleContinue}
              className={`w-full py-4 rounded-xl ${valid ? 'bg-primary-500' : 'bg-gray-200'}`}
              disabled={!valid}
            >
              <Text className={`text-center text-base font-medium ${valid ? 'text-white' : 'text-gray-400'}`}>Continue</Text>
            </TouchableOpacity>
          </View>
            </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
        <View className="flex-1 px-6 pt-4">
        <View className="mb-8 flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-black">
            Send to a Kaluuba Tag
              </Text>
        </View>

        <View className="mb-8">
          <Text className="text-base text-gray-600 mb-6">
            Send to a previous or a new recipient
              </Text>
          
          <TouchableOpacity
            onPress={handleNewRecipient}
            className="w-full flex-row items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 mb-4"
          >
            <View className="flex-row items-center">
              <View 
                className="mr-3 h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: '#f0f9f4' }}
              >
                <Ionicons name="person-add-outline" size={20} color="#306B4F" />
              </View>
              <Text className="text-base font-medium text-black">
                Send to a new recipient
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="flex-row items-center rounded-xl border border-gray-200 bg-white px-4 py-4">
            <Ionicons name="search" size={20} color="#9CA3AF" className="mr-3" />
            <TextInput
              className="flex-1 text-base text-black"
              placeholder="Search by name or account details"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
      </View>

        <View className="flex-1 items-center justify-center">
          <View 
            className="mb-4 h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: '#F3F4F6' }}
          >
            <Ionicons name="people-outline" size={32} color="#9CA3AF" />
          </View>
          <Text className="text-base font-medium text-black mb-2">
            Recent recipients
          </Text>
          <Text className="text-sm text-gray-500">
            No recent recipients to show
          </Text>
        </View>
      </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Kaluuba;
