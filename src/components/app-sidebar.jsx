import * as React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Command, FileChartColumn, LayoutPanelLeft, Percent, ScrollText, Users } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { getUserRole, filterNavByRole } from "../utils/hasRole";

const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutPanelLeft,
  },
  {
    title: "Transaksi",
    icon: ScrollText,
    items: [
      { title: "Penjualan", url: "/penjualan" },
      { title: "Biaya", url: "/biaya" },
    ],
  },
  {
    title: "Data Master",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Owner", url: "#", roles: ["admin"] },
      { title: "Sayuran", url: "#" },
      { title: "Pelanggan", url: "#" },
      { title: "Unit", url: "#" },
    ],
  },
  {
    title: "Laporan",
    url: "/laporan",
    icon: FileChartColumn,
    roles: ["admin", "owner", "operator"],
  },
  {
    title: "Bagi Hasil",
    url: "/bagi-hasil",
    icon: Percent,
    roles: ["admin", "owner", "operator"],
  },
  {
    title: "User",
    url: "/user",
    icon: Users,
    roles: ["admin"],
  },
];

export function AppSidebar({ ...props }) {
  const role = getUserRole();
  const filteredNavMain = filterNavByRole(navMain, role);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div> */}
                <img src="logo.png" alt="Logo" width="40" height="40" className="aspect-square" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Saku Tani</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
