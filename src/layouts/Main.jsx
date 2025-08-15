import React from "react";
import {AppSidebar} from "@/components/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

const MainLayout = ({header, children}) => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 cursor-pointer"/>
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4"/>
                        {header}
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>

                <footer className="text-center text-sm text-gray-500 py-4">© 2025 Agung Laksono Putra. No rights
                    reserved.
                </footer>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default MainLayout;
