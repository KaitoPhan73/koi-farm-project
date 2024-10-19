import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/user-nav";
import AppProvider from "@/redux/AppProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Koi Management",
  description: "Koi Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <Sidebar />
          <main className="mx-5 mt-16 sm:ml-[300px] sm:mt-3">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <div className="ml-auto flex items-center space-x-4">
                  <ModeToggle />
                  <UserNav />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4 lg:p-8 md:p-8 pt-6">
              {children}
            </div>
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
