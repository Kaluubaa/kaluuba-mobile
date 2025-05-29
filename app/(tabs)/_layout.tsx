import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4c18cc',
        tabBarInactiveTintColor: '#888',
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 80,
          paddingBottom: 3,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontFamily: 'sofia-regular',
          fontSize: 11,
        },
        headerShown: false,
        animation: 'fade',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="invoices"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="receipt-outline" size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="card-outline" size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
