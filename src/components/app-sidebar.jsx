import * as React from "react"
import {BookOpen, FileChartColumn, GalleryVerticalEnd, LayoutPanelLeft, Percent, ScrollText, Users} from "lucide-react"
import {useLocation, Link} from "react-router-dom";

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import {filterNavByRole, getUserRole} from "@/utils/hasRole.js";
import {NavUser} from "@/components/nav-user.jsx";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: LayoutPanelLeft,
        },
        {
            title: "Transaksi",
            icon: ScrollText,
            items: [
                {title: "Penjualan", url: "/penjualan"},
                {title: "Biaya", url: "/biaya"},
            ],
        },
        // {
        //     title: "Data Master",
        //     url: "#",
        //     icon: BookOpen,
        //     items: [
        //         {title: "Owner", url: "#", roles: ["admin"]},
        //         {title: "Sayuran", url: "#"},
        //         {title: "Pelanggan", url: "#"},
        //         {title: "Unit", url: "#"},
        //     ],
        // },
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
    ],
}

function isMainMenuActive(item, pathname) {
    if (item.url && item.url !== "/" && item.url !== "#") {
        return pathname.startsWith(item.url);
    }
    if (item.url === "/") {
        return pathname === "/";
    }
    return false;
}

export function AppSidebar({...props}) {
    const role = getUserRole();
    const filteredNavMain = filterNavByRole(data.navMain, role);

    const {pathname} = useLocation();

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuButton size="lg" asChild>
                        <Link to="/" className="flex items-center gap-2">
                            <img src="logo.png" alt="Logo" width="40" height="40" className="aspect-square"/>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">Saku Tani</span>
                                <span className="truncate text-xs">Enterprise</span>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {filteredNavMain.map((item) => {
                            const isMainActive = isMainMenuActive(item, pathname);

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isMainActive}>
                                        {item.url && item.url !== "#" ? (
                                            <Link to={item.url} className="font-medium flex items-center gap-2">
                                                {item.icon && <item.icon className="size-4"/>}
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <button type="button"
                                                    className="font-medium flex items-center gap-2 cursor-default">
                                                {item.icon && <item.icon className="size-4"/>}
                                                {item.title}
                                            </button>
                                        )}
                                    </SidebarMenuButton>

                                    {item.items?.length ? (
                                        <SidebarMenuSub>
                                            {item.items.map((sub) => {
                                                const isSubActive = sub.url && sub.url !== "#" && pathname.startsWith(sub.url);
                                                return (
                                                    <SidebarMenuSubItem key={sub.title}>
                                                        <SidebarMenuSubButton asChild isActive={isSubActive}>
                                                            {sub.url && sub.url !== "#" ?
                                                                <Link to={sub.url}>{sub.title}</Link> :
                                                                <span>{sub.title}</span>}
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    ) : null}
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    );
}
