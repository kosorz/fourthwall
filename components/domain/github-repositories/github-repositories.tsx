import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table/table"
import { Repository } from "@/lib/types/github"
import numeral from "numeral"
import { Headers } from "./components/headers/headers"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert/alert"
import { PiEmpty } from "react-icons/pi"
import Link from "next/link"
import { cn } from "@/lib/functions/cn/cn"

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
        <AlertDescription>{q === "" ? `Please provide search phrase` : `No results found for ${q}`}</AlertDescription>
      </Alert>
    )

  return (
    <Table className={cn(edges.length > 7 && "min-h-[500px]", `border mb-4`)}>
      <TableHeader>
        <Headers />
      </TableHeader>
      <TableBody>
        {edges.map(({ node }) => (
          <TableRow key={node.id} className="hover:bg-gray-100">
            <TableCell className="max-sm:hidden">{node.owner.login}</TableCell>
            <TableCell className="max-sm:hidden">{numeral(node.stargazerCount).format("0a")}</TableCell>
            <TableCell className="max-sm:hidden">{new Date(node.createdAt).toLocaleDateString("pl-PL")}</TableCell>
            <TableCell className="font-medium">
              <Link className="h-full w-full block m-[-8px] p-[8px] cursor-pointer" href={`/repository/${node.id}`}>
                {node.name}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>A list of matching repositories.</TableCaption>
    </Table>
  )
}

export default async function GithubRepositoriesAsync(props: Props) {
  return GithubRepositories(props)
}
