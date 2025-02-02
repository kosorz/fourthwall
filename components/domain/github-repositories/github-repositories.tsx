import { Table, TableBody, TableCaption, TableHeader, TableLinkCell, TableRow } from "@/components/ui/table/table"
import { Repository } from "@/lib/types/github"
import numeral from "numeral"
import { Headers } from "./components/headers/headers"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert/alert"
import { PiEmpty } from "react-icons/pi"
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
          const redirect = `/repository/${node.id}`

          return (
            <TableRow key={node.id} className="hover:bg-gray-100">
              <TableLinkCell href={redirect} className={"max-sm:hidden"}>
                {node.owner.login}
              </TableLinkCell>
              <TableLinkCell href={redirect}>{numeral(node.stargazerCount).format("0a")}</TableLinkCell>
              <TableLinkCell href={redirect} className={"max-sm:hidden"}>
                {new Date(node.createdAt).toLocaleDateString("pl-PL")}
              </TableLinkCell>
              <TableLinkCell className={"font-medium"} href={redirect}>
                {node.name}
              </TableLinkCell>
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
