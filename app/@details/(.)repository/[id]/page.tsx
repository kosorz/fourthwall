import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getRepo } from "@/lib/api/github"
import { Edge } from "@/lib/types/github"
import numeral from "numeral"

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const repo: Edge = await getRepo({ id })

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{repo.name}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          {`This repository has ${numeral(repo.stargazerCount).format("0a") || "unknown number of"} star/s, is owned by 
            ${repo.owner.login || "unknown author"} and was created at ${new Date(repo.createdAt).toLocaleDateString(
            "pl-PL"
          )}`}
        </DialogDescription>
        <DialogDescription>Description: {repo.description}</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
