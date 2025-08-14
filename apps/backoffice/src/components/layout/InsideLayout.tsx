import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subTitle?: string;
}

const InsideLayout = ({ children, title, subTitle }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-6 px-4 sm:px-6 bg-primary/5 border-b animate-fade-in">
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col gap-2 mb-2">
            <h1 className="text-3xl font-semibold tracking-tight animate-slide-down">
              {title}
            </h1>
            <p className="text-muted-foreground animate-slide-down">
              {subTitle}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto px-4 sm:px-6 space-y-8 py-8 animate-slide-up">
        {children}
      </div>
    </div>
  );
};

export default InsideLayout;
