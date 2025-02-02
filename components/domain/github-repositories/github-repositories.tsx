import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table/table"
import { Repository } from "@/lib/types/github"
import numeral from "numeral"
import { Headers } from "./components/headers/headers"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert/alert"
import { PiEmpty } from "react-icons/pi"
import Link from "next/link"
import { cn } from "@/lib/functions/cn/cn"
import { ReactNode } from "react"

type Props = {
  edges: { node: Repository }[]
  q: string | string[]
}

export function GithubRepositories({ edges, q }: Props) {
  if (!q) return

  if (edges.length === 0)
    return (
      <Alert>
        <PiEmpty width={16} height={16} />
        <AlertTitle>Nothing found</AlertTitle>
        <AlertDescription className="break-words">
          {q === "" ? `Please provide search phrase` : `No results found for ${q}`}
        </AlertDescription>
      </Alert>
    )

  return (
    <Table className={cn(edges.length > 7 && "min-h-[500px]", `border mb-4`)}>
      <TableHeader>
        <Headers />
      </TableHeader>
      <TableBody>
        {edges.map(({ node }) => {
          function LinkWrapper({ children }: { children: ReactNode }) {
            return (
              <Link className="h-full w-full block p-[8px] cursor-pointer" href={`/repository/${node.id}`}>
                {children}
              </Link>
            )
          }

          const cellClasses = "p-0"

          return (
            <TableRow key={node.id} className="hover:bg-gray-100">
              <TableCell className={cn(cellClasses, "max-sm:hidden")}>
                <LinkWrapper>{node.owner.login}</LinkWrapper>
              </TableCell>
              <TableCell className={cellClasses}>
                <LinkWrapper>{numeral(node.stargazerCount).format("0a")}</LinkWrapper>
              </TableCell>
              <TableCell className={cn(cellClasses, "max-sm:hidden")}>
                <LinkWrapper>{new Date(node.createdAt).toLocaleDateString("pl-PL")}</LinkWrapper>
              </TableCell>
              <TableCell className={cn(cellClasses, "font-medium")}>
                <LinkWrapper>{node.name}</LinkWrapper>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
      <TableCaption>A list of matching repositories.</TableCaption>
    </Table>
  )
}

export default async function GithubRepositoriesAsync(props: Props) {
  return GithubRepositories(props)
}
