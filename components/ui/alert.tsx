import React, { HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/functions/cn"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = ({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>) => {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

const AlertTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
  return <h5 className={cn("mb-2 font-medium text-xl leading-none tracking-tight", className)} {...props} />
}

const AlertDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
  return <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
}

export { Alert, AlertTitle, AlertDescription }
