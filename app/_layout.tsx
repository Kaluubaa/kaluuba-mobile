import '../global.css';

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { customFonts } from '../constants/fonts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '~/services/api';

export default function Layout() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'jarkataregular',
          },
        }}
      />
    </QueryClientProvider>
  );
}
