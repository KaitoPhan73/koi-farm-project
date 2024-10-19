"use client";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <main>{children}</main>
        <Toaster />
        <ToasterSonner />
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
