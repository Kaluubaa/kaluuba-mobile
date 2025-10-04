import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View, SafeAreaView, StatusBar } from 'react-native';
import { CreateInvoice } from '~/components/invoice/CreateInvoice';

export default function CreateInvoiceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View className="flex-1 px-6 pt-4 pb-3">
        <View className="mb-8 flex gap-3">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-[20px] font-jarkatabold text-black">
            Create New Invoice
          </Text>
        </View>
        
        <CreateInvoice />
      </View>
    </SafeAreaView>
  );
}
