"use client"

import { Button } from "@/components/ui/button/button"
import { TableHead, TableRow } from "@/components/ui/table/table"
import { cn } from "@/lib/functions/cn/cn"
import { SortDirections } from "@/lib/types/github"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"

export function Headers() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function sortBy(sort: [SortDirections, SortDirections]) {
    const [asc, desc] = sort

    const nextParams = new URLSearchParams()

    nextParams.set("sort", searchParams.get("sort") === desc ? asc : desc)
    nextParams.set("q", searchParams.get("q") || "")

    router.push(`?${nextParams.toString()}`)
  }

  const buttonStyles = "h-[40px] px-[8px] py-[1px] flex justify-start cursor-pointer"

  return (
    <TableRow>
      <TableHead className="max-sm:hidden">User</TableHead>

      <Button
        className={cn(buttonStyles, "max-sm:hidden")}
        variant={"ghost"}
        asChild
        onClick={() => sortBy([SortDirections.StarsAsc, SortDirections.StarsDesc])}
      >
        <TableHead>Stars</TableHead>
      </Button>

      <TableHead className="max-sm:hidden">Created at</TableHead>

      <Button
        className={buttonStyles}
        variant={"ghost"}
        asChild
        onClick={() => sortBy([SortDirections.NameAsc, SortDirections.NameDesc])}
      >
        <TableHead className="w-full">Name</TableHead>
      </Button>
    </TableRow>
  )
}
