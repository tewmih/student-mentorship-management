import React from "react"
import { cn } from "../utils/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary text-foreground hover:bg-primary/80 border border-border",
    secondary: "bg-secondary text-foreground hover:bg-secondary/80 border border-border",
    destructive: "bg-destructive text-foreground hover:bg-destructive/80 border border-border",
    outline: "text-foreground"
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge } 