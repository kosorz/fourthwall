import { Table, TableBody, TableCaption, TableHeader } from "@/src/components/ui/table/table"
import { Repository } from "@/src/lib/types/github"
import { Headers } from "./components/headers/headers"
import { cn } from "@/src/lib/functions/cn/cn"
import { FULL_SIZE_TABLE_MIN_ITEMS } from "@/src/lib/constants/constants"
import { EmptyState } from "./components/empty-state/empty-state"
import { RepositoryRow } from "./components/repository-row/repository-row"

type Props = {
  edges: { node: Repository }[] | undefined
}

export function GithubRepositories({ edges }: Props) {
  if (edges === undefined) return null

  if (edges.length === 0) return <EmptyState />

  return (
    <Table className={cn(edges.length >= FULL_SIZE_TABLE_MIN_ITEMS && "min-h-[500px]", `border mb-4`)}>
      <TableHeader>
        <Headers />
      </TableHeader>
      <TableBody>
        {edges.map(({ node }) => (
          <RepositoryRow key={node.id} node={node} />
        ))}
      </TableBody>
      <TableCaption>A list of matching repositories.</TableCaption>
    </Table>
  )
}

export default async function GithubRepositoriesAsync(props: Props) {
  return GithubRepositories(props)
}
