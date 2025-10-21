import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetContainer from './BottomSheetContainer';
import { Ionicons } from '@expo/vector-icons';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SelectField = ({ label, options, value, onChange, placeholder = 'Select...' }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openSheet = () => bottomSheetRef.current?.expand();
  const closeSheet = () => bottomSheetRef.current?.close();

  const selected = options.find((opt) => opt.value === value);

  return (
    <View>
      <Text className="mb-2 font-jarkataregular text-gray-600">{label}</Text>
      <TouchableOpacity
        className="flex-row items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-3"
        onPress={openSheet}
        activeOpacity={0.8}>
        <Text
          className={`font-jarkatamedium text-base ${selected ? 'text-gray-800' : 'text-gray-400'}`}>
          {selected ? selected.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['40%']}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}>
        <BottomSheetContainer title={label} onClose={closeSheet}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="w-full flex-row items-center justify-between border-b border-gray-100 px-2 py-4"
                onPress={() => {
                  onChange(item.value);
                  closeSheet();
                }}>
                <Text className="text-base text-gray-800">{item.label}</Text>
                {value === item.value ? (
                  <Ionicons name="radio-button-on" size={22} color="#306B4F" />
                ) : (
                  <Ionicons name="radio-button-off" size={22} color="#bbb" />
                )}
              </TouchableOpacity>
            )}
          />
        </BottomSheetContainer>
      </BottomSheet>
    </View>
  );
};

export default SelectField;
