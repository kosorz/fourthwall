import { render } from "@testing-library/react"
import { RepositoryScreen } from "./repository"
import { Repository } from "@/src/lib/types/github"

const props = {
  params: Promise.resolve({ id: "123" }),
}

const repository: Repository = {
  owner: { login: "test-owner" },
  id: "test-id",
  stargazerCount: 1,
  createdAt: new Date("2024-01-12T00:00:00.000Z").toISOString(),
  description: "test-description",
  name: "test-name",
}

global.fetch = jest.fn().mockReturnValue({
  ok: true,
  json: () =>
    Promise.resolve({
      data: {
        node: repository,
      },
      errors: null,
    }),
})

afterEach(() => {
  jest.clearAllMocks()
})

it("checks repository", async () => {
  const Result = await RepositoryScreen(props)
  const screen = render(Result)

  const repositoryName = screen.getByText("test-name")
  expect(repositoryName).toBeInTheDocument()

  const repositoryDetails = screen.getByText(
    /this repository has 1 star\/s, is owned by test-owner and was created at 12\.01\.2024/i
  )
  expect(repositoryDetails).toBeInTheDocument()

  const repositoryDescription = screen.getByText(/description: test-description/i)
  expect(repositoryDescription).toBeInTheDocument()

  const detailsSection = screen.getByText(/description: test-description/i).closest("div")
  expect(detailsSection).toBeInTheDocument()
})
