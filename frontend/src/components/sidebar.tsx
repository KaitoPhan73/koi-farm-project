"use client";

import {
  Home,
  List,
  Mail,
  MoreHorizontal,
  ShoppingCart,
  User,
  Package,
  ChartBarStacked,
  Megaphone,
} from "lucide-react";

import { SidebarDesktop } from "./sidebar-desktop";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sidebar-mobile";
import { SidebarItems } from "./types";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const baseSidebarItems: SidebarItems = {
  links: [
    {
      href: "/manage/categories",
      icon: List,
      label: "Category",
    },
    {
      href: "/manage/products",
      icon: Package,
      label: "Product",
    },
    {
      href: "/manage/product-bases",
      icon: Package,
      label: "Product Base",
    },
    {
      href: "/manage/feedbacks",
      icon: List,
      label: "Feedback",
    },
  ],
  extras: (
    <div className="flex flex-col gap-2">{/* Extra buttons can go here */}</div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);
  // Determine the sidebar items based on user role
  const sidebarItems: SidebarItems = {
    links: [
      ...(user?.role === "Manager"
        ? [
            {
              href: "/manage/reports",
              icon: Megaphone,
              label: "Report",
            },
            {
              href: "/manage/users",
              icon: User,
              label: "Account",
            },
            {
              href: "/manage/orders",
              icon: ShoppingCart,
              label: "Order",
            },
          ]
        : []), // If not a Manager, add no extra items
      ...baseSidebarItems.links,
    ],
    extras: baseSidebarItems.extras,
  };

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
