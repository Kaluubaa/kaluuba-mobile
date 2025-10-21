import { View, Text, ScrollView, TouchableOpacity, Pressable, BackHandler } from 'react-native';
import { Container } from '~/components/reusbales/Container';
import { useAuth } from '~/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import Header from '~/components/reusbales/Header';

export default function ProfileScreen() {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const { user: profileUser, loading, logout } = useAuth();

  // Handle back button to close/minimize app instead of going to login
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  if (loading) {
    return (
      <Container className="pt-6">
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container className="flex-1">
      <Header title="Profile" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="px-6 py-8">
          <View className="items-center">
            {/* Avatar */}
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-primary-100">
              <Text className="font-jarkatabold text-2xl text-primary-600">
                {profileUser?.username?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>

            {/* User Info */}
            <Text className="mb-1 font-jarkatasemibold text-xl text-gray-900">
              {profileUser?.username}
            </Text>
            <Text className="font-jarkataregular text-sm text-gray-500">
              {profileUser?.email}
            </Text>
          </View>
        </View>

        {/* Balance Card */}
        {/* <View className="mb-6 px-6">
          <View className="rounded-xl bg-white p-6">
            <View className="mb-4 items-center">
              <View className="flex-row items-center gap-2">
                <Text className="font-jarkatamedium text-sm text-gray-600">Account Balance</Text>
                <Pressable onPress={() => setShowBalance(!showBalance)} className="p-1">
                  <Ionicons
                    name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                    size={16}
                    color="#9ca3af"
                  />
                </Pressable>
              </View>
              <View className="mt-2 flex-row items-center gap-2">
                <Text className="font-jarkatabold text-2xl text-gray-900">
                  {showBalance ? '$0.00' : '****'}
                </Text>
                <Text className="font-jarkataregular text-sm text-gray-500">USDC</Text>
              </View>
            </View>
          </View>
        </View> */}

        {/* Quick Stats */}
        <View className="mb-6 px-6">
          <View className="flex-row gap-4">
            <View className="flex-1 rounded-xl bg-white p-4">
              <View className="mb-2 h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                <Ionicons name="document-text" size={16} color="#306B4F" />
              </View>
              <Text className="font-jarkatabold text-lg text-gray-900">0</Text>
              <Text className="font-jarkataregular text-xs text-gray-500">Invoices</Text>
            </View>
            
            <View className="flex-1 rounded-xl bg-white p-4">
              <View className="mb-2 h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Ionicons name="swap-horizontal" size={16} color="#3B82F6" />
              </View>
              <Text className="font-jarkatabold text-lg text-gray-900">0</Text>
              <Text className="font-jarkataregular text-xs text-gray-500">Transactions</Text>
            </View>
            
            <View className="flex-1 rounded-xl bg-white p-4">
              <View className="mb-2 h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Ionicons name="people" size={16} color="#10B981" />
              </View>
              <Text className="font-jarkatabold text-lg text-gray-900">0</Text>
              <Text className="font-jarkataregular text-xs text-gray-500">Clients</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className="px-6 pb-8">
          <Text className="mb-4 font-jarkatasemibold text-base text-gray-900">Settings</Text>
          
          <View className="rounded-xl bg-white">
            <TouchableOpacity className="flex-row items-center border-b border-gray-100 p-4">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Ionicons name="wallet-outline" size={18} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="font-jarkatamedium text-sm text-gray-900">Wallet Settings</Text>
                <Text className="font-jarkataregular text-xs text-gray-500">Manage your wallet preferences</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center border-b border-gray-100 p-4">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Ionicons name="notifications-outline" size={18} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="font-jarkatamedium text-sm text-gray-900">Notifications</Text>
                <Text className="font-jarkataregular text-xs text-gray-500">Customize your notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center border-b border-gray-100 p-4">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Ionicons name="shield-outline" size={18} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="font-jarkatamedium text-sm text-gray-900">Security</Text>
                <Text className="font-jarkataregular text-xs text-gray-500">Manage your account security</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center border-b border-gray-100 p-4">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Ionicons name="help-circle-outline" size={18} color="#6B7280" />
              </View>
              <View className="flex-1">
                <Text className="font-jarkatamedium text-sm text-gray-900">Help & Support</Text>
                <Text className="font-jarkataregular text-xs text-gray-500">Get help and contact support</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4" onPress={logout}>
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <Ionicons name="log-out-outline" size={18} color="#EF4444" />
              </View>
              <View className="flex-1">
                <Text className="font-jarkatamedium text-sm text-red-600">Sign Out</Text>
                <Text className="font-jarkataregular text-xs text-gray-500">Sign out of your account</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
