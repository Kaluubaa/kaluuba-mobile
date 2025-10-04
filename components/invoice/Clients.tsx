import React from 'react';
import { View, Text, FlatList, Pressable, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { IClient } from '~/types/invoice.t';
import { Button } from '../reusbales/Button';

type Props = {
  clients: IClient[];
  onRefresh?: () => void;
  refreshing?: boolean;
};

const Clients = ({ clients, onRefresh, refreshing = false }: Props) => {
  const renderClient = ({ item }: { item: IClient }) => {
    const initial = item.contactName
      ? item.contactName.charAt(0).toUpperCase()
      : item.clientIdentifier.charAt(0).toUpperCase();

    return (
      <Pressable
        onPress={() => {}}
        className="mb- flex-row items-center justify-between rounded-lg p-3 ">
        <View className="flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-primary-600">
            {/* <Text className="text-white text-lg font-bold">{initial}</Text> */}
          </View>
          <View className="flex-1">
            <Text className="font-jarkatamedium text-base text-gray-800">
              {item.contactName || item.clientIdentifier}
            </Text>
            <Text className="font-jarkataregular text-sm text-gray-500"> Invoice Count (2) </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => {}} className="">
          <Ionicons name="ellipsis-vertical" size={16} color="#4b5563" />
        </TouchableOpacity>
      </Pressable>
    );
  };

  return (
    <View className="flex-1">
      {clients.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-4 pt-52">
          <Ionicons name="person-add" size={24} color="#9ca3af" />
          <Text className="font-jarkatamedium text-base text-gray-400">
            You have not added any client yet
          </Text>
          <Button
            size="sm"
            className="px-6 py-2.5"
            textClassName="flex-row"
            onPress={() => router.push('/invoices/create-client')}>
            Add Client/Customer
          </Button>
        </View>
      ) : (
        <FlatList
          data={clients}
          renderItem={renderClient}
          keyExtractor={(item) => item.id.toString()}
          contentContainerClassName="p-4"
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#6366f1"
                colors={['#6366f1']}
                title="Pull to refresh"
                titleColor="#6b7280"
              />
            ) : undefined
          }
        />
      )}

      <Button
        className="px-6 h-[45px]"
        textClassName="flex-row text-sm"
        onPress={() => router.push('/invoices/create-client')}>
        Add Client/Customer
      </Button>
    </View>
  );
};

export default Clients;
