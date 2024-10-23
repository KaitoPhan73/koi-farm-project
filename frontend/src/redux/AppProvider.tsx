"use client";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/userContext";
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>

        <Toaster />
        <ToasterSonner />
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
