import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { router } from 'expo-router';

const SendTypeSheet = () => {
  return (
    <ActionSheet
      id="send-type-sheet"
      isModal={true}
      closable={true}
      backgroundInteractionEnabled={false}
      containerStyle={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#eee',
      }}>
      <View className=" py-[33.5px]">
        <View className="relative mb-[30px]">
          <TouchableOpacity
            className="absolute -left-3 -top-2.5 z-[1] p-3"
            onPress={() => SheetManager.hide('add-wallet-sheet')}>
            {/* <Icon iconName="multiply" /> */}
          </TouchableOpacity>
          <Text className="text-center font-jarkatabold text-[19px] -tracking-[0.3px]">
            Send Money
          </Text>

          <Text className="mt-3 text-center font-jarkataregular text-sm text-gray-600">
            Where would you like to send money to?
          </Text>
        </View>
      </View>
    </ActionSheet>
  );
};

export default SendTypeSheet;
