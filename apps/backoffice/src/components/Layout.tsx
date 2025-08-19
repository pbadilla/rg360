import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-secondary">
      <div className="fixed inset-x-0 top-0 z-50">
        <header className="border-b border-border/40 backdrop-blur-lg bg-background/70">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary/80 flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">
                  P
                </span>
              </div>
              <span className="font-medium">Promotion Management</span>
            </div>
          </div>
        </header>
      </div>
      <main className={cn("container py-24 animate-fade-in", className)}>
        {children}
      </main>
    </div>
  );
}
