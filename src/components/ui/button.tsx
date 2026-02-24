import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-cyan-200/30 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm ring-1 ring-red-200/30 hover:bg-destructive/90 hover:shadow-md hover:-translate-y-0.5",
        outline:
          "border border-input bg-white/80 shadow-sm hover:bg-white hover:text-accent-foreground hover:shadow-md hover:-translate-y-0.5 dark:bg-background",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm ring-1 ring-cyan-200/20 hover:bg-secondary/90 hover:shadow-md hover:-translate-y-0.5",
        ghost: "hover:bg-accent/70 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "rounded-2xl bg-[#0AA7B5] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#0AA7B5]/30 ring-1 ring-[#57E6FF]/35 before:absolute before:inset-y-0 before:-left-12 before:w-8 before:rotate-[20deg] before:bg-white/30 before:opacity-0 before:transition-all before:duration-500 hover:-translate-y-0.5 hover:bg-[#00838F] hover:shadow-lg hover:before:left-[120%] hover:before:opacity-100 focus-visible:ring-2 focus-visible:ring-[#0AA7B5]/50 cursor-pointer",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-11 px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
