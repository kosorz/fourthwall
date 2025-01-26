"use server"

import { BrowseDirection } from "../types/pagination"

export async function fetchGithubRepositories({
  startCursor,
  endCursor,
  direction = BrowseDirection.Backward,
  sort,
  q,
}: {
  startCursor?: string | string[] | undefined
  endCursor?: string | string[] | undefined
  q: string | string[] | undefined
  sort: string | string[] | undefined
  direction?: string | string[] | undefined
}) {
  const headers = {
    "content-type": "application/json",
    Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
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
    next: { revalidate: 60 },
  }

  const request = await fetch("https://api.github.com/graphql", options)

  const json = await request.json()

  if (Array.isArray(json.errors) || !!json?.status) {
    throw Error("fetch failed")
  }

  return json
}
