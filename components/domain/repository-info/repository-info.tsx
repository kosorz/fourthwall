import { Repository } from "@/lib/types/github"
import numeral from "numeral"

type Props = Repository

export function RepositoryInfo({ stargazerCount, owner, createdAt }: Props) {
  if (!stargazerCount || !owner || !createdAt) return <span>Couldn't retrieve data</span>

  return (
    <span>{`This repository has ${numeral(stargazerCount).format("0a") || "unknown number of"} star/s, is owned by 
    ${owner.login || "unknown author"} and was created at ${new Date(createdAt).toLocaleDateString("pl-PL")}`}</span>
  )
}
