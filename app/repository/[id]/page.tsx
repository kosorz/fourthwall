import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getRepo } from "@/lib/api/github"
import { Edge } from "@/lib/types/github"
import Link from "next/link"
import numeral from "numeral"

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const repo: Edge = await getRepo({ id })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{repo.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          {`This repository has ${numeral(repo.stargazerCount).format("0a") || "unknown number of"} star/s, is owned by 
                    ${repo.owner.login || "unknown author"} and was created at ${new Date(
            repo.createdAt
          ).toLocaleDateString("pl-PL")}`}
        </p>
        <p>Description: {repo.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="m-auto" asChild>
          <Link href={"/"}>Discover other repositories</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
