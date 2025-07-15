import * as React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Command, FileChartColumn, LayoutPanelLeft, ScrollText, SquareTerminal, User } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutPanelLeft,
      isActive: true,
    },
    {
      title: "Transaksi",
      url: "#",
      icon: ScrollText,
      items: [
        {
          title: "Penjualan",
          url: "#",
        },
        {
          title: "Biaya",
          url: "#",
        },
      ],
    },
    {
      title: "Data Master",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Owner",
          url: "#",
        },
        {
          title: "Sayuran",
          url: "#",
        },
        {
          title: "Pelanggan",
          url: "#",
        },
        {
          title: "Unit",
          url: "#",
        },
      ],
    },
    {
      title: "Laporan",
      url: "#",
      icon: FileChartColumn,
      isActive: true,
    },
    {
      title: "User",
      url: "/user",
      icon: User,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
