import { RepositoryInfo } from "@/src/components/domain/repository-info/repository-info"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/ui/dialog/dialog"
import { useGetRepo } from "@/src/hooks/useGetRepo"

type Props = {
  params: Promise<{ id: string }>
}

export async function DetailsScreen({ params }: Props) {
  const repository = await useGetRepo(await params)

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
