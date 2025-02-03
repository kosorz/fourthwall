import { RepositoryInfo } from "@/components/domain/repository-info/repository-info"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog"
import { getRepo } from "@/data-access/github"

type Props = {
  params: Promise<{ id: string }>
}

export async function DetailsScreen({ params }: Props) {
  const { id } = await params
  const repository = await getRepo({ id })

  return (
    <Dialog open>
      <DialogContent withHistoryBackClose>
        <DialogHeader>
          <DialogTitle>{repository?.name || "Not available"}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <RepositoryInfo {...repository} />
        </DialogDescription>
        <DialogDescription>Description: {repository?.description || "Not available"}</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
