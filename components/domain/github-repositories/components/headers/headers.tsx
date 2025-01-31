"use client"

import { Button } from "@/components/ui/button/button"
import { TableHead, TableRow } from "@/components/ui/table/table"
import { SortDirections } from "@/lib/types/github"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import { FaSort } from "react-icons/fa"

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

  const buttonStyles = "h-[40px] px-[8px] py-[1px] flex justify-start cursor-pointer w-full p-0 hover:bg-transparent"

  return (
    <TableRow>
      <TableHead className="max-sm:hidden">User</TableHead>

      <TableHead>
        <Button
          className={buttonStyles}
          variant={"ghost"}
          onClick={() => sortBy([SortDirections.StarsAsc, SortDirections.StarsDesc])}
        >
          Stars <FaSort />
        </Button>
      </TableHead>

      <TableHead className="max-sm:hidden">Created at</TableHead>

      <TableHead className="w-full">
        <Button
          className={buttonStyles}
          variant={"ghost"}
          onClick={() => sortBy([SortDirections.NameAsc, SortDirections.NameDesc])}
        >
          Name <FaSort />
        </Button>
      </TableHead>
    </TableRow>
  )
}
