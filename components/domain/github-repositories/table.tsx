import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/functions/cn"
import { EdgeNode } from "@/lib/types/github"
import numeral from "numeral"
import { Headers } from "./headers"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleOff } from "lucide-react"

type Props = {
  edges: EdgeNode[]
  q: string | string[]
}

export async function GithubRepositoriesTable({ edges, q }: Props) {
  if (!q) return

  if (edges.length === 0)
    return (
      <Alert>
        <CircleOff width={16} height={16} />
        <AlertTitle>Nothing found</AlertTitle>
        <AlertDescription>{q === "" ? `Please provide search phrase` : `No results found for ${q}`}</AlertDescription>
      </Alert>
    )

  return (
    <Table className="min-h-[500px] border mb-4">
      <TableHeader>
        <Headers />
      </TableHeader>
      <TableBody>
        {edges.map(({ node }) => (
          <TableRow key={`repository-${node.id}`}>
            <TableCell>{node.owner.login}</TableCell>
            <TableCell>{numeral(node.stargazerCount).format("0a")}</TableCell>
            <TableCell>{new Date(node.createdAt).toLocaleDateString("pl-PL")}</TableCell>
            <TableCell className="font-medium">{node.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>A list of matching repositories.</TableCaption>
    </Table>
  )
}
