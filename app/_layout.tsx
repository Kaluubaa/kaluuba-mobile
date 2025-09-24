import '../global.css';

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { customFonts } from '../constants/fonts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '~/context/ToastContext';
import { AuthProvider } from '~/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SheetProvider } from 'react-native-actions-sheet';
import SendTypeSheet from '~/components/sheets/SendTypeShee';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView className="flex-1">
        <SheetProvider context="global">
          <SendTypeSheet />
          <ToastProvider>
            <AuthProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  headerTitleStyle: {
                    fontFamily: 'jarkataregular',
                  },
                }}>
                <Stack.Screen
                  name="index"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="scan"
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="send"
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="recieve"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
            </AuthProvider>
          </ToastProvider>
        </SheetProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
