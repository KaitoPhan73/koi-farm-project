import { Slot } from 'expo-router';
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
          <CartProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Slot />
            </ThemeProvider>
          </CartProvider>
          <Toast />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SessionProvider>
  );
}