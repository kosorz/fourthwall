import { TableLinkCell, TableRow } from "@/src/components/ui/table/table"
import { Repository } from "@/src/lib/types/github"
import numeral from "numeral"

export const RepositoryRow = ({ node }: { node: Repository }) => {
  const redirect = `/repository/${node.id}`

  return (
    <TableRow key={node.id} className="hover:bg-gray-100">
      <TableLinkCell href={redirect} className="max-sm:hidden">
        {node.owner.login}
      </TableLinkCell>
      <TableLinkCell href={redirect}>{numeral(node.stargazerCount).format("0a")}</TableLinkCell>
      <TableLinkCell href={redirect} className="max-sm:hidden">
        {new Date(node.createdAt).toLocaleDateString("pl-PL")}
      </TableLinkCell>
      <TableLinkCell className="font-medium" href={redirect}>
        {node.name}
      </TableLinkCell>
    </TableRow>
  )
}
