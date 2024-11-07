"use client";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/user-nav";
import dynamic from "next/dynamic";

// Import Sidebar as a named export
const Sidebar = dynamic(
  () => import("@/components/sidebar").then((mod) => mod.Sidebar),
  {
    ssr: false,
  }
);

type Props = {
  children: React.ReactNode;
};

const LayoutClient = ({ children }: Props) => {
  return (
    <>
      <Sidebar />
      <div className="mx-5 mt-16 sm:ml-[300px] sm:mt-3">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 lg:p-8 md:p-8 pt-6">{children}</div>
      </div>
    </>
  );
};

export default LayoutClient;
