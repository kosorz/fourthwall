import { render } from "@testing-library/react"
import { ResultsScreen } from "./results"
import { PageInfo, Repository } from "@/src/lib/types/github"
import { BrowseDirection } from "@/src/lib/types/pagination"

const props = {
  searchParams: Promise.resolve({
    q: "test",
    startCursor: "start-cursor",
    endCursor: "end-cursor",
    direction: BrowseDirection.Forward,
    sort: "",
  }),
}

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

const pageInfo: PageInfo = {
  hasNextPage: true,
  hasPreviousPage: true,
  startCursor: "start-cursor",
  endCursor: "end-cursor",
}

global.fetch = jest.fn().mockReturnValue({
  ok: true,
  json: () =>
    Promise.resolve({
      data: {
        search: { edges, pageInfo },
      },
      errors: null,
    }),
})

afterEach(() => {
  jest.clearAllMocks()
})

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}))

jest.mock("nextjs-toploader/app", () => ({
  useRouter: jest.fn(),
}))

it("checks table", async () => {
  const Result = await ResultsScreen(props)
  const screen = render(Result)

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

  expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument()
  expect(screen.getByLabelText("Go to next page")).toBeInTheDocument()

  const previousButton = screen.getByLabelText("Go to previous page")
  const nextButton = screen.getByLabelText("Go to next page")

  expect(previousButton).toHaveAttribute("aria-disabled", "false")
  expect(nextButton).toHaveAttribute("aria-disabled", "false")
})
