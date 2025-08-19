import type React from "react";

import { Bell, Moon, Search, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "@/hooks/use-theme";

import { cn } from "@/lib/utils";

interface HeaderProps {
  collapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ collapsed }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={cn(
        "h-16 fixed right-0 top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm",
        {
          "left-60": !collapsed,
          "left-[72px]": collapsed,
        },
      )}
    >
      <div className="h-full flex items-center justify-end px-6">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <Button variant="ghost" size="sm" className="ml-auto">
            <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary mr-2">
              JD
            </span>
            <span>John Doe</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
