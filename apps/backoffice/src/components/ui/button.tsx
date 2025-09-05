import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary/70 focus-visible:ring-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:bg-destructive/70 focus-visible:ring-destructive",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 focus-visible:ring-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:bg-secondary/70 focus-visible:ring-secondary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground disabled:hover:bg-transparent disabled:text-muted-foreground focus-visible:ring-accent",
        link:
          "text-primary underline-offset-4 hover:underline disabled:text-muted-foreground focus-visible:ring-primary",
        success:
          "bg-success text-success-foreground hover:bg-success/90 disabled:bg-success/70 focus-visible:ring-success",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning/90 disabled:bg-warning/70 focus-visible:ring-warning",
        info:
          "bg-info text-info-foreground hover:bg-info/90 disabled:bg-info/70 focus-visible:ring-info",
        error:
          "bg-error text-error-foreground hover:bg-error/90 disabled:bg-error/70 focus-visible:ring-error",
        light:
          "bg-light text-light-foreground hover:bg-light/90 disabled:bg-light/70 focus-visible:ring-light",
        dark:
          "bg-dark text-dark-foreground hover:bg-dark/90 disabled:bg-dark/70 focus-visible:ring-dark",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary/70 focus-visible:ring-primary",
        tertiary:
          "bg-tertiary text-tertiary-foreground hover:bg-tertiary disabled:bg-tertiary/70 focus-visible:ring-tertiary",
        transparent:
          "bg-transparent text-foreground hover:bg-accent disabled:text-muted-foreground focus-visible:ring-accent",
        disabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
        active:
          "bg-purple-600 text-white hover:bg-purple-700 disabled:bg-purple-400 focus-visible:ring-purple-600",
        reserve: "bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
