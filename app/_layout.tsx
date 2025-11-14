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

// Inter Fonts
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

const queryClient = new QueryClient();

export default function RootLayout() {
  // Load BOTH custom fonts + Inter fonts
  const [fontsLoaded] = useFonts({
    ...customFonts, // your Jakarta fonts
    InterLight: Inter_300Light,
    InterRegular: Inter_400Regular,
    InterMedium: Inter_500Medium,
    InterSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
  });

  if (!fontsLoaded) return null;

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
                    fontFamily: 'InterRegular',
                  },
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="scan" options={{ headerShown: false }} />
                <Stack.Screen name="send" options={{ headerShown: false }} />
                <Stack.Screen name="recieve" options={{ headerShown: false }} />
              </Stack>
            </AuthProvider>
          </ToastProvider>
        </SheetProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
