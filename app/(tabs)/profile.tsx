import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '~/components/reusbales/Container';
import { useAuth } from '~/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '~/hooks/use-auth';

export default function ProfileScreen() {
  const { data, isLoading } = useProfile();
  const profileUser = data?.user;

  if (isLoading) {
    return (
      <Container className="pt-6">
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container className='pt-6'>
      <ScrollView className="flex-1 pt-4 pb-10" showsVerticalScrollIndicator={false}>
        <View className="">
          <SafeAreaView>
            <View className="px-4">
              <View className="flex-row items-center justify-between">
              </View>
            </View>
          </SafeAreaView>
        </View>

        <View className="-mt-16 px-4">
          <View className="items-center">
            <View className="relative">
              <Image
                source={{ uri: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=John' }}
                className="h-32 w-32 rounded-full border-4 border-white"
              />
              <TouchableOpacity className="absolute bottom-0 right-0 rounded-full bg-primary-500 p-2">
                <Ionicons name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View className="mt-4 items-center">
              <Text className="text-xl font-jarkatasemibold text-gray-900">{profileUser?.username}</Text>
              <Text className="text-gray-500 text-sm font-jarkataregular">{profileUser?.email}</Text>
              {profileUser?.wallet && (
                <Text className="text-xs text-gray-400 mt-1 font-jarkatalight">
                  {profileUser.wallet.address.slice(0, 6)}...{profileUser.wallet.address.slice(-4)}
                </Text>
              )}
            </View>
          </View>

          <View className="mt-6 flex-row justify-between">
            <TouchableOpacity className="items-center rounded-xl bg-white p-4" style={{ width: '31%' }}>
              <View className="rounded-full bg-primary-100 p-3">
                <Ionicons name="document-text-outline" size={24} color="#007AFF" />
              </View>
              <Text className="mt-2 text-sm font-jarkatamedium text-gray-900">Invoices</Text>
              <Text className="text-xs font-jarkatalight text-gray-500">12 Total</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center rounded-xl bg-white p-4" style={{ width: '31%' }}>
              <View className="rounded-full bg-green-100 p-3">
                <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
              </View>
              <Text className="mt-2 text-sm font-jarkatasemibold text-gray-900">Paid</Text>
              <Text className="text-xs font-jarkatalight text-gray-500">8 Invoices</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center rounded-xl bg-white p-4" style={{ width: '31%' }}>
              <View className="rounded-full bg-orange-100 p-3">
                <Ionicons name="cash-outline" size={24} color="#FF9500" />
              </View>
              <Text className="mt-2 text-sm font-jarkatasemibold text-gray-900">Total</Text>
              <Text className="text-xs font-jarkatalight text-gray-500">₦450K</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-6 space-y-4">
            <Text className="text-lg font-jarkatasemibold text-gray-900 mb-4">Account Information</Text>
            
            <View className="rounded-xl bg-white p-4 mb-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="rounded-full bg-blue-100 p-2">
                    <Ionicons name="shield-checkmark-outline" size={20} color="#007AFF" />
                  </View>
                  <View className="ml-3">
                    <Text className="text-sm font-jarkatasemibold text-gray-900">Verification Status</Text>
                    <Text className="text-xs font-jarkatalight text-gray-500">
                      {profileUser?.is_verified ? 'Verified Account' : 'Pending Verification'}
                    </Text>
                  </View>
                </View>
                <View className={`h-2 w-2 rounded-full ${profileUser?.is_verified ? 'bg-green-500' : 'bg-yellow-500'}`} />
              </View>
            </View>

            <View className="rounded-xl bg-white p-4">
              <View className="flex-row items-center">
                <View className="rounded-full bg-purple-100 p-2">
                  <Ionicons name="calendar-outline" size={20} color="#AF52DE" />
                </View>
                <View className="ml-3">
                  <Text className="text-sm font-jarkatasemibold text-gray-900">Member Since</Text>
                  <Text className="text-xs font-jarkatalight text-gray-500">
                    {new Date(profileUser?.created_at || '').toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-6 gap-4">
            <Text className="text-lg font-jarkatasemibold text-gray-900">Settings</Text>
            
            <TouchableOpacity className="flex-row items-center justify-between rounded-xl bg-white p-4">
              <View className="flex-row items-center">
                <View className="rounded-full bg-gray-100 p-2">
                  <Ionicons name="notifications-outline" size={20} color="#8E8E93" />
                </View>
                <Text className="ml-3 text-gray-900">Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between rounded-xl bg-white p-4">
              <View className="flex-row items-center">
                <View className="rounded-full bg-gray-100 p-2">
                  <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" />
                </View>
                <Text className="ml-3 text-gray-900">Privacy & Security</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between rounded-xl bg-white p-4">
              <View className="flex-row items-center">
                <View className="rounded-full bg-gray-100 p-2">
                  <Ionicons name="help-circle-outline" size={20} color="#8E8E93" />
                </View>
                <Text className="ml-3 text-gray-900">Help & Support</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}