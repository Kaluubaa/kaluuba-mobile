import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const keys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', '<'],
];

export const NumericKeypad = ({ onKeyPress }: { onKeyPress: (key: string) => void }) => (
    
  <View className="mt-6">
    {keys.map((row, rowIdx) => (
      <View key={rowIdx} className="flex-row justify-between mb-12">
        {row.map((key) => (
          <TouchableOpacity
            key={key}
            className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mx-8 active:bg-gray-200"
            onPress={() => onKeyPress(key)}
          >
            <Text className="text-2xl font-bold text-gray-800">
              {key === '<' ? '⌫' : key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ))}
  </View>
);