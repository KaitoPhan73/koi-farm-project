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
    { label: "Trang Chủ", href: "/", icon: Home },
    { label: "Báo cáo", href: "/admin/report", icon: Megaphone },
    {
      href: "/admin/users",
      icon: User,
      label: "Nguời Dùng",
    },
    {
      href: "/admin/orders",
      icon: ShoppingCart,
      label: "Đơn Hàng",
    },
    {
      href: "/admin/customs",
      icon: List,
      label: "Sản Phẩm Tùy Chỉnh",
    },
    {
      href: "/admin/products",
      icon: Package,
      label: "Sản Phẩm",
    },
    {
      href: "/admin/base-models",
      icon: Package,
      label: "Sản Phẩm Gốc",
    },
    {
      href: "/admin/categories",
      icon: ChartBarStacked,
      label: "Phân Loại",
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
