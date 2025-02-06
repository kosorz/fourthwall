import React, { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react"
import { cn } from "@/lib/functions/cn/cn"
import Link from "next/link"

const Table = ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  )
}

const TableHeader = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
  return <thead className={cn("[&_tr]:border-b [&_th]:font-semibold bg-gray-200", className)} {...props} />
}

const TableBody = ({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => {
  return <tbody className={cn("[&_tr:last-child]:border-0 mb-5", className)} {...props} />
}

const TableRow = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => {
  return <tr className={cn("border-b transition-colors", className, "not:first:hover:bg-blue-50")} {...props} />
}

const TableHead = ({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

const TableCell = ({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td
      className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
      {...props}
    />
  )
}

const TableLinkCell = ({
  className,
  href,
  children,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { href: string }) => {
  return (
    <TableCell {...props} className={cn("p-0", className)}>
      <Link href={href} className={"cursor-pointer p-2 w-full block"}>
        {children}
      </Link>
    </TableCell>
  )
}

const TableCaption = ({ className, ...props }: HTMLAttributes<HTMLTableCaptionElement>) => {
  return <caption className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
}

export { Table, TableHeader, TableBody, TableHead, TableRow, TableLinkCell, TableCell, TableCaption }
