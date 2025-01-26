import { cn } from "@/lib/functions/cn"
import React, { HTMLAttributes } from "react"

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props} />
)
Card.displayName = "Card"

const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
)
CardHeader.displayName = "CardHeader"

const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
)
CardTitle.displayName = "CardTitle"

const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-sm text-muted-foreground", className)} {...props} />
)
CardDescription.displayName = "CardDescription"

const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)
CardContent.displayName = "CardContent"

const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
