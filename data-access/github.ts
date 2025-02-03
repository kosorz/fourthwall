"use server"

import { Repository, RepositorySearchResponse } from "@/lib/types/github"
import { BrowseDirection } from "../lib/types/pagination"

const headers = {
  "content-type": "application/json",
  Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
}

export async function getRepos({
  startCursor,
  endCursor,
  direction = BrowseDirection.Backward,
  sort,
  q,
}: {
  startCursor?: string | string[]
  endCursor?: string | string[]
  q?: string | string[]
  sort?: string | string[]
  direction?: string | string[]
}): Promise<RepositorySearchResponse> {
  if (!q) {
    throw Error("Search phrase is required.")
  }

  const requestBody = {
    query: `query ($q: String!, $after: String, $before: String, $first: Int, $last: Int) {
      search(query: $q, after: $after, first: $first, last: $last, before: $before, type: REPOSITORY) {
        edges {
          node {
            ... on Repository {
              name
              createdAt
              stargazerCount
              owner {
                login
              }
              id
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }`,
    variables: {
      q: `${q} sort:${sort}`,
      ...(direction === BrowseDirection.Forward ? { after: endCursor, first: 10 } : { before: startCursor, last: 10 }),
    },
  }

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
    next: { revalidate: 3600 },
  }

  const response = await fetch("https://api.github.com/graphql", options)

  if (!response.ok) {
    throw Error(`GraphQL request failed: ${response.statusText}`)
  }

  const { data, errors } = await response.json()

  if (errors) {
    throw Error(`GraphQL request failed`)
  }

  return data
}

export async function getRepo({ id }: { id?: string }): Promise<Repository> {
  if (!id) {
    throw Error("Repository ID is required.")
  }

  const query = `
    query($id: ID!) {
      node(id: $id) {
        ... on Repository {
          name
          createdAt
          stargazerCount
          description
          owner {
            login
          }
          id
        }
      }
    }
  `

  const requestBody = {
    query,
    variables: { id },
  }

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
    next: { revalidate: 3600 },
  }

  const response = await fetch("https://api.github.com/graphql", options)

  if (!response.ok) {
    throw Error(`GraphQL request failed: ${response.statusText}`)
  }

  const { data, errors } = await response.json()

  if (errors) {
    throw Error(`GraphQL request failed`)
  }

  return data.node
}
