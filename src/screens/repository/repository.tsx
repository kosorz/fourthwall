import { RepositoryInfo } from "@/src/components/domain/repository-info/repository-info"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card/card"
import { useGetRepo } from "@/src/hooks/useGetRepo"
import { Params } from "next/dist/server/request/params"

type Props = {
  params: Promise<Params>
}

export async function RepositoryScreen({ params }: Props) {
  const repository = await useGetRepo(await params)

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
