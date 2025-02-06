import { render } from "@testing-library/react"
import { Repository } from "@/lib/types/github"
import { GithubRepositories } from "./github-repositories"

const edges: { node: Repository }[] = Array.from({ length: 3 }, (_, index) => ({
  node: {
    owner: { login: `test-owner-${index + 1}` },
    id: `test-id-${index + 1}`,
    stargazerCount: (index + 1) * 10,
    createdAt: new Date(2024, 0, 12 - index).toISOString(),
    description: `test-description-${index + 1}`,
    name: `test-name-${index + 1}`,
  },
}))

afterEach(() => {
  jest.clearAllMocks()
})

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}))

jest.mock("nextjs-toploader/app", () => ({
  useRouter: jest.fn(),
}))

it("checks table with content", () => {
  const screen = render(<GithubRepositories edges={edges} q={"qwe"} />)

  expect(screen.getByText("User")).toBeInTheDocument()
  expect(screen.getByText("Stars")).toBeInTheDocument()
  expect(screen.getByText("Created at")).toBeInTheDocument()
  expect(screen.getByText("Name")).toBeInTheDocument()

  const rows = screen.getAllByRole("row")
  expect(rows).toHaveLength(4)

  expect(screen.getByText("test-owner-1")).toBeInTheDocument()
  expect(screen.getByText("10")).toBeInTheDocument()
  expect(screen.getByText("12.01.2024")).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "test-name-1" })).toHaveAttribute("href", "/repository/test-id-1")

  expect(screen.getByText("test-owner-2")).toBeInTheDocument()
  expect(screen.getByText("20")).toBeInTheDocument()
  expect(screen.getByText("11.01.2024")).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "test-name-2" })).toHaveAttribute("href", "/repository/test-id-2")

  expect(screen.getByText("test-owner-3")).toBeInTheDocument()
  expect(screen.getByText("30")).toBeInTheDocument()
  expect(screen.getByText("10.01.2024")).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "test-name-3" })).toHaveAttribute("href", "/repository/test-id-3")

  expect(screen.getByText("A list of matching repositories.")).toBeInTheDocument()
})

it("checks table without search", () => {
  const screen = render(<GithubRepositories edges={[]} q={""} />)

  expect(screen.container.children.length).toBe(0)
})

it("checks table without content", () => {
  const screen = render(<GithubRepositories edges={[]} q={"abc"} />)

  expect(screen.getByText("Nothing found")).toBeInTheDocument()
  expect(screen.getByText("No results found for abc")).toBeInTheDocument()
})
