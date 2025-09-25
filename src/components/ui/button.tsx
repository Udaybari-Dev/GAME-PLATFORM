import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90 hover:shadow-glow rounded-xl",
        gaming: "btn-neon rounded-xl px-6 py-3 text-lg font-orbitron",
        accent: "bg-accent text-accent-foreground shadow-accent-glow hover:bg-accent/90 hover:shadow-accent-glow rounded-xl",
        secondary: "bg-secondary text-secondary-foreground shadow hover:bg-secondary/80 rounded-xl",
        destructive: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 rounded-xl",
        outline: "border-2 border-border bg-transparent hover:bg-card rounded-xl",
        ghost: "hover:bg-muted/50 rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        card: "bg-gradient-card border border-border/50 text-card-foreground hover:scale-105 transition-all duration-300 rounded-2xl p-6",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-xs rounded-lg",
        lg: "h-12 px-8 text-base rounded-xl",
        xl: "h-14 px-10 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
        card: "h-auto w-full min-h-[120px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
