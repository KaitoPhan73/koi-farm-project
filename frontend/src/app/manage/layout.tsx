import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/user-nav";
import LayoutClient from "./_components/layout-client";
export const metadata: Metadata = {
  title: "Koi Management",
  description: "Koi Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutClient>{children}</LayoutClient>;
}
