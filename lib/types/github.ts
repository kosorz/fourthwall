export type Response = {
  data: {
    search: {
      edges: EdgeNode[]
      pageInfo: PageInfo
    }
  }
}

export type EdgeNode = {
  node: {
    owner: { login: string }
    id: number
    stargazerCount: number
    createdAt: string
    name: string
  }
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
