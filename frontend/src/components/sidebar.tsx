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
import { SidebarButton } from "./sidebar-button";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sidebar-mobile";
import { SidebarItems } from "./types";

const sidebarItems: SidebarItems = {
  links: [
    {
      href: "/admin/users",
      icon: User,
      label: "Account",
    },
    {
      href: "/admin/orders",
      icon: ShoppingCart,
      label: "Order",
    },
    {
      href: "/admin/feedbacks",
      icon: List,
      label: "Feedback",
    },
    {
      href: "/admin/categories",
      icon: List,
      label: "Category",
    },
    {
      href: "/admin/products",
      icon: Package,
      label: "Product",
    },
  ],
  extras: (
    <div className="flex flex-col gap-2">
      {/* <SidebarButton icon={MoreHorizontal} className="w-full">
        Thêm
      </SidebarButton> */}
      {/* <SidebarButton className="w-full justify-center " variant="default">
        ADMINISTRATION
      </SidebarButton> */}
    </div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
