"use server"

import { Repository, RepositorySearchResponse } from "@/src/lib/types/github"
import { SearchParams } from "next/dist/server/request/search-params"
import { REPOSITORIES_PLACEHOLDER_DATA } from "@/src/lib/constants/constants"
import { BrowseDirection } from "@/src/lib/types/pagination"

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
}: SearchParams): Promise<RepositorySearchResponse> {
  if (!q) {
    return REPOSITORIES_PLACEHOLDER_DATA
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

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
    next: {
      revalidate: 60,
    },
  })

  if (!response.ok) {
    throw Error(`GraphQL request failed: ${response.statusText}`)
  }

  const { data, errors } = await response.json()

  if (errors) {
    throw Error(`GraphQL request failed`)
  }

  return data
}

export async function getRepo({ id }: SearchParams): Promise<Repository> {
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

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
    next: {
      revalidate: 60,
    },
  })

  if (!response.ok) {
    throw Error(`GraphQL request failed: ${response.statusText}`)
  }

  const { data, errors } = await response.json()

  if (errors) {
    throw Error(`GraphQL request failed`)
  }

  return data.node
}
