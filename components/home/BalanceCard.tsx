import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ArrowsPathIcon } from '~/components/icons/heroicons';
import { images } from '~/constants/images';
import { router } from 'expo-router';
import { Balance } from '~/types/user';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';

type Props = {
  balances: Balance[];
  loadingBalance: boolean;
  openRecieveSheet: any;
};

const BalanceCard = ({ balances, loadingBalance, openRecieveSheet }: Props) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USDC');
  const [showBalance, setShowBalance] = React.useState<boolean>(false);

  const currencies = [
    { symbol: 'USDC', name: 'USDC', logo: images.usdc },
    { symbol: 'USDT', name: 'USDT', logo: images.usdc },
    { symbol: 'CNGN', name: 'CNGN', logo: images.usdc },
  ];

  const actions = [
    // {
    //   title: 'Invoice',
    //   icon: 'document-attach-outline',
    //   onPress: () => router.push('/invoices/create'),
    // },

    {
      title: 'Recieve',
      icon: 'arrow-down-outline',
      onPress: () => router.push('/recieve'),
    },
    {
      title: 'Send',
      icon: 'arrow-up-outline',
      onPress: () => router.push('/send/send'),
    },
    {
      title: 'Convert',
      icon: 'custom',
      customIcon: 'ArrowsPathIcon',
      onPress: () => {},
    },
  ];

  const usdc = balances && balances[0];
  const usdt = balances && balances[1];
  const cngn = balances && balances[2];

  const getBalanceForCurrency = (currency: string) => {
    switch (currency) {
      case 'USDC':
        return usdc?.formatted || '0';
      case 'USDT':
        return usdt?.formatted || '0';
      case 'CNGN':
        return cngn?.formatted || '0';
      default:
        return '0';
    }
  };

  return (
    <View className="relative flex min-h-[150px] w-full items-center rounded-2xl bg-primary-600 py-6">
      <Image
        source={images.pattern}
        className="absolute inset-0 h-[150px] w-full "
        style={{ resizeMode: 'cover' }}
      />
      <View>
        <TouchableOpacity
          onPress={() => SheetManager.show('balance-currency-sheet')}
          className="w-full flex-row items-center gap-3 rounded-full bg-white/70 px-3 py-1.5">
          <View className="size-5 overflow-hidden rounded-full bg-black">
            <Image
              source={currencies.find((c) => c.symbol === selectedCurrency)?.logo || images.usdc}
              className="h-full w-full"
            />
          </View>
          <Text className="font-jarkatamedium text-sm text-gray-600">{selectedCurrency}</Text>
          <Ionicons name="chevron-down" size={15} color={'#6B7280'} />
        </TouchableOpacity>
      </View>

      <View className="mt-6 flex-row items-center gap-2">
        <Text className="font-clashmedium text-[24px] tracking-widest text-gray-50">
          {loadingBalance ? (
            <View className="h-7 w-24 animate-pulse rounded bg-gray-300" />
          ) : showBalance ? (
            `$ ${Number(getBalanceForCurrency(selectedCurrency)).toFixed(2)}`
          ) : (
            '$ *****'
          )}
        </Text>
        <Pressable onPress={() => setShowBalance(!showBalance)} className="p-2">
          <Ionicons
            name={showBalance ? 'eye-outline' : 'eye-off-outline'}
            size={16}
            color="#ffffff"
          />
        </Pressable>
      </View>

      <View className="mt-8 flex-row gap-10 px-3">
        {actions.map((action, index) => (
          <TouchableOpacity className="items-center" onPress={action.onPress} key={index}>
            <View className="shadow-xs h-[45px] w-[45px] items-center justify-center rounded-full border border-gray-200 bg-white ">
              {action.icon === 'custom' && action.customIcon === 'ArrowsPathIcon' ? (
                <ArrowsPathIcon size={15} color="#306B4F" />
              ) : (
                <Ionicons
                  name={action.icon as keyof typeof Ionicons.glyphMap}
                  size={15}
                  color="#306B4F"
                />
              )}
            </View>
            <Text className="mt-2 text-center font-jarkatamedium text-sm text-gray-50">
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Currency Selection Sheet */}
      <ActionSheet
        id="balance-currency-sheet"
        isModal={true}
        closable={true}
        backgroundInteractionEnabled={false}
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
        }}>
        <View className="px-6 py-6">
          <Text className="mb-6 text-center font-jarkatabold text-lg text-black">
            Select Currency
          </Text>
          {currencies.map((currency, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedCurrency(currency.symbol);
                SheetManager.hide('balance-currency-sheet');
              }}
              className="flex-row items-center border-b border-gray-100 py-4">
              <Image source={currency.logo} className="mr-3 h-6 w-6" />
              <View className="flex-1">
                <Text className="font-jarkatamedium text-base text-black">{currency.name}</Text>
                <Text className="font-jarkataregular text-sm text-gray-500">
                  Balance: ${Number(getBalanceForCurrency(currency.symbol)).toFixed(2)}
                </Text>
              </View>
              {selectedCurrency === currency.symbol && (
                <Ionicons name="checkmark" size={20} color="#306B4F" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ActionSheet>
    </View>
  );
};

export default BalanceCard;
