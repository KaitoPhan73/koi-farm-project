import { Slot, Stack } from 'expo-router';
import { SessionProvider } from '@/utils/ctx';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FavoritesProvider } from "@/hooks/useFavorite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { CartProvider } from '@/hooks/useCartActions';
import { StripeProvider } from '@stripe/stripe-react-native';

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StripeProvider publishableKey="pk_test_51QHsQpH5nEoA5Qza90TFPtCz1mC7GXikWgrK8CSerTDG82fpKf9XXyNNqUbXzO5bYdGxoeNuYLLr7aDTSNhVhV9S00JjrEUaSW">
            <CartProvider>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
              </ThemeProvider>
            </CartProvider>
            <Toast />
          </StripeProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SessionProvider>
  );
}
