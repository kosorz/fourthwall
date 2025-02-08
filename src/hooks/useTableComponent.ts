import GithubRepositoriesAsync, {
  GithubRepositories,
} from "@/src/components/domain/github-repositories/github-repositories"

export const useTable = () => {
  // to have streaming via suspense we need to render async component
  // to be able to render it in jest test we need synchronous component
  // those are childhood problem of server components in conjunction with JEST
  return process.env.NODE_ENV !== "test" ? GithubRepositoriesAsync : GithubRepositories
}
