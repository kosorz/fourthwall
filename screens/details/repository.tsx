import { RepositoryInfo } from "@/components/domain/repository-info/repository-info"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog/dialog"
import { getRepo } from "@/lib/api/github"
import { Repository } from "@/lib/types/github"

type Props = {
  params: Promise<{ id: string }>
}

export async function RepositoryScreen({ params }: Props) {
  const { id } = await params
  const repository: Repository = await getRepo({ id })

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{repository.name}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <RepositoryInfo {...repository} />
        </DialogDescription>
        <DialogDescription>Description: {repository.description}</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
