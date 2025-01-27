export type Response = {
  data: {
    search: {
      edges: { node: Repository }[]
      pageInfo: PageInfo
    }
  }
}

export type Repository = {
  owner: { login: string }
  id: string
  stargazerCount: number
  createdAt: string
  description: string
  name: string
}

export type PageInfo = {
  startCursor: string
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export enum SortDirections {
  StarsAsc = "stars-asc",
  StarsDesc = "stars-desc",
  NameAsc = "name-asc",
  NameDesc = "name-desc",
}
