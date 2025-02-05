import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import { DetailsScreen as DetailsScreen } from "./details"
import { Repository } from "@/lib/types/github"

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

jest.mock("nextjs-toploader/app", () => ({
  useRouter: jest.fn().mockReturnValue({ back: jest.fn() }),
}))

afterEach(() => {
  jest.clearAllMocks()
})

it("checks details", async () => {
  const Result = await DetailsScreen(props)
  const screen = render(Result)

  const repositoryName = screen.getByRole("heading", { name: "test-name" })
  expect(repositoryName).toBeInTheDocument()

  const repositoryDetails = screen.getByText(
    /this repository has 1 star\/s, is owned by test-owner and was created at 12\.01\.2024/i
  )
  expect(repositoryDetails).toBeInTheDocument()

  const repositoryDescription = screen.getByText(/description: test-description/i)
  expect(repositoryDescription).toBeInTheDocument()

  const dialog = screen.getByRole("dialog", { name: "test-name" })
  expect(dialog).toBeInTheDocument()
})
