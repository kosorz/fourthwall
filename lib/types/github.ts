export type Response = {
  data: {
    search: {
      edges: { node: Edge }[]
      pageInfo: PageInfo
    }
  }
}

export type Edge = {
  owner: { login: string }
  id: number
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
