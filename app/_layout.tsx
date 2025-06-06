import '../global.css';

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { customFonts } from '../constants/fonts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '~/context/ToastContext';
import { AuthProvider } from '~/context/AuthContext';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              headerTitleStyle: {
                fontFamily: 'jarkataregular',
              },
            }}
          />
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
