import { cn } from "@/src/lib/functions/cn/cn"
import { HTMLAttributes } from "react"

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />
}

export { Skeleton }
