
import React from 'react';
import { Bell, Moon, Search, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface HeaderProps {
  collapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ collapsed }) => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className={cn(
      "h-16 fixed right-0 top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm",
      {
        "left-72": !collapsed,
        "left-[72px]": collapsed,
      }
    )}>
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex-1">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
            <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary mr-2">JD</span>
            <span>John Doe</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
