import { RepositoryInfo } from "@/components/domain/repository-info/repository-info"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card"
import { getRepo } from "@/api/github"

type Props = {
  params: Promise<{ id: string }>
}

export async function RepositoryScreen({ params }: Props) {
  const { id } = await params
  const repository = await getRepo({ id })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{repository?.name || "Not available"}</CardTitle>
      </CardHeader>
      <CardContent>
        <RepositoryInfo {...repository} />
        <p className="mt-4">Description: {repository?.description || "Not available"}</p>
      </CardContent>
    </Card>
  )
}
