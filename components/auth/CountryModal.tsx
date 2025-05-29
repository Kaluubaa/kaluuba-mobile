import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Input } from '../reusbales/Input'

export interface Country {
  name: string;
  code: string;
  flag: string;
}

type Props = {
    isCountryModalVisible: boolean;
    setIsCountryModalVisible: (state: boolean) => void;
    searchQuery: string;
    setSearchQuery: (state: string) => void
    filteredCountries: Country[];
    setSelectedCountry: (state: Country) => void
}

const CountryModal = ({ isCountryModalVisible, setIsCountryModalVisible, searchQuery, setSearchQuery, filteredCountries, setSelectedCountry }: Props) => {
  return (
     <Modal
        visible={isCountryModalVisible}
        onRequestClose={() => setIsCountryModalVisible(false)}
        animationType="slide">
        <SafeAreaView className="flex-1 px-6 pt-10">
          <View className="flex-row items-center border-b border-gray-100 p-4">
            <TouchableOpacity onPress={() => setIsCountryModalVisible(false)} className="mr-4">
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>

            <View className="flex-1">
              <Input
                placeholder="Search country"
                value={searchQuery}
                onChangeText={setSearchQuery}
                leftIcon="search"
              />
            </View>
          </View>

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-row items-center border-b border-gray-100 p-4"
                onPress={() => {
                  setSelectedCountry(item);
                  setIsCountryModalVisible(false);
                }}>
                <Text className="mr-3 text-lg">{item.flag}</Text>
                <Text className="font-jarkata-medium text-gray-900">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
  )
}

export default CountryModal