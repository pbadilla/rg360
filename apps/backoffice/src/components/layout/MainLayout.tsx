import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { menuItems } from "@/components/constants/menuItems";

interface MainLayoutProps {
  children: React.ReactNode;
}

const Logo = () => (
  <div className="flex items-center">
    <span className="font-semibold text-base">Rollergrind360</span>
  </div>
);

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
      <Sidebar
        menuItems={menuItems}
        logo={sidebarCollapsed ? "RG360" : <Logo />}
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />

      <div
        className={cn("flex-1 transition-all duration-300 ease-in-out", {
          "ml-61": !sidebarCollapsed && !isMobile,
          "ml-[72px]": sidebarCollapsed && !isMobile,
          "ml-2": isMobile,
        })}
      >
        <Header collapsed={sidebarCollapsed} />
        <main className="pt-16">
          <div className="mx-auto px-0 py-8 w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};
