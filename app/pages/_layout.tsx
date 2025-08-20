import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      {/* <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          // statusBarStyle: 'light',
          // animation: 'slide_from_bottom',
        }}
      /> */}

      <Stack.Screen
        name="scan"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
