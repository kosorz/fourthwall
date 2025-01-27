import { RepositoryInfo } from "@/components/domain/repository-info/repository-info"
import { Button } from "@/components/ui/button/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card"
import { getRepo } from "@/lib/api/github"
import { Repository } from "@/lib/types/github"

type Props = {
  params: Promise<{ id: string }>
}

export async function RepositoryScreen({ params }: Props) {
  const { id } = await params
  const repository: Repository = await getRepo({ id })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{repository.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <RepositoryInfo {...repository} />
        <p>Description: {repository.description}</p>
      </CardContent>
    </Card>
  )
}
