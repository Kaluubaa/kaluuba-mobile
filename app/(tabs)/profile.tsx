import { View, Image, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '~/components/reusbales/Container';
import { useAuth } from '~/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
// import { useProfile } from '~/hooks/use-auth';

export default function ProfileScreen() {
  // const { data, isLoading } = useProfile();
  // const profileUser = data?.user;

  const [showBalance, setShowBalance] = React.useState<boolean>(false);

  const { user: profileUser, loading } = useAuth();

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
    <Container className="pt-6">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="bg-purple-500 px-6 pb-20 pt-8">
          <SafeAreaView>
            <View className="items-center">
              <View className="relative mb-4">
                <Image
                  source={{ uri: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=John' }}
                  className="h-20 w-20 rounded-full border-2 border-white"
                />
                <TouchableOpacity className="absolute -bottom-1 -right-1 rounded-full bg-white p-1.5">
                  <Ionicons name="camera" size={14} color="#8B5CF6" />
                </TouchableOpacity>
              </View>

              <Text className="mb-1 font-jarkatasemibold text-lg text-white">
                {profileUser?.username}
              </Text>
              <Text className="font-jarkataregular text-sm text-purple-100">
                {profileUser?.email}
              </Text>
            </View>
          </SafeAreaView>
        </View>

        {/* Balance Card */}
        <View className="-mt-12 mb-6 px-6">
          <View className="rounded-2xl bg-white p-6 shadow-lg">
            <View className="mb-4 items-center">
              <View className="flex-row items-center gap-2">
                <Text className="font text-sm text-gray-900">Account Balance</Text>
                <Pressable onPress={() => setShowBalance(!showBalance)} className="p-2">
                  <Ionicons
                    name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#9ca3af"
                  />
                </Pressable>
              </View>
              <View className="mt-1 flex-row items-center gap-2">
                <Text className="font-clashmedium text-[26px] text-gray-900">
                  {showBalance ? '$ 112.00' : '₦ ****'}
                </Text>
                <Text className="font-jarkataregular text-gray-100">usdc</Text>
              </View>
            </View>
            <View className="flex-row justify-between border-t border-gray-100 pt-4">
              <View className="items-center">
                <Text className="font-jarkatasemibold text-lg text-gray-900">12</Text>
                <Text className="text-xs text-gray-500">Invoices</Text>
              </View>

              <View className="items-center">
                <Text className="font-jarkatasemibold text-lg text-purple-600">
                  {showBalance ? '₦ 89,600.00' : '₦ ****'}
                </Text>
                <Text className="text-xs text-gray-500">NGN</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Status */}
        <View className="mb-6 px-6">
          <View className="rounded-xl bg-white p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 rounded-full bg-purple-100 p-2">
                  <Ionicons
                    name={profileUser?.is_verified ? 'shield-checkmark' : 'shield-outline'}
                    size={18}
                    color="#8B5CF6"
                  />
                </View>
                <View>
                  <Text className="font-jarkatasemibold text-sm text-gray-900">
                    {profileUser?.is_verified ? 'Verified Account' : 'Pending Verification'}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    Member since {new Date(profileUser?.created_at || '').toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View
                className={`h-3 w-3 rounded-full ${profileUser?.is_verified ? 'bg-green-500' : 'bg-yellow-500'}`}
              />
            </View>
          </View>
        </View>

        <View className="px-6 pb-8">
          <Text className="mb-3 font-jarkatasemibold text-base text-gray-900">Settings</Text>
          <View className="overflow-hidden rounded-xl bg-white">
            <TouchableOpacity className="flex-row items-center border-b border-gray-100 p-4">
              <View className="mr-3 rounded-full bg-gray-100 p-2">
                <Ionicons name="wallet-outline" size={18} color="#6B7280" />
              </View>
              <Text className="flex-1 text-sm text-gray-900">Wallet Settings</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center border-b border-gray-100 p-4">
              <View className="mr-3 rounded-full bg-gray-100 p-2">
                <Ionicons name="notifications-outline" size={18} color="#6B7280" />
              </View>
              <Text className="flex-1 text-sm text-gray-900">Notifications</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4">
              <View className="mr-3 rounded-full bg-gray-100 p-2">
                <Ionicons name="help-circle-outline" size={18} color="#6B7280" />
              </View>
              <Text className="flex-1 text-sm text-gray-900">Help & Support</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
