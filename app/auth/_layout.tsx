import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      {/* <StatusBar barStyle="light-content" backgroundColor="black" /> */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          // statusBarStyle: 'light',
          // animation: 'slide_from_bottom',
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="verifyOtp"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="success"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="authoption"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
