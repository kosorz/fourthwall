"use server"

import { BrowseDirection } from "../types/pagination"

export async function getRepos({
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
    next: { revalidate: 3600 },
  }

  const response = await fetch("https://api.github.com/graphql", options)

  if (!response.ok) {
    throw Error(`GraphQL request failed: ${response.statusText}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw Error(`GraphQL request failed`)
  }

  return json
}

export async function getRepo({ id }: { id?: string | string[] | undefined }) {
  if (!id) {
    throw Error("Repository ID is required.")
  }

  const headers = {
    "content-type": "application/json",
    Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
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

  const body = JSON.stringify({
    query,
    variables: { id },
  })

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body,
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
