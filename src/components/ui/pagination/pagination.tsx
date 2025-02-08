import React, { ComponentProps } from "react"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"

import { cn } from "@/src/lib/functions/cn/cn"
import { ButtonProps, buttonVariants } from "../button/button"

const Pagination = ({ className, ...props }: ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = ({ className, ...props }: ComponentProps<"ul">) => (
  <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = ({ className, ...props }: ComponentProps<"li">) => (
  <li className={cn("", className)} {...props} />
)
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  ComponentProps<"a">

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({ className, ...props }: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5 cursor-pointer", className)}
    {...props}
  >
    <FaAngleLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, ...props }: ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5 cursor-pointer", className)}
    {...props}
  >
    <span>Next</span>
    <FaAngleRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext }
