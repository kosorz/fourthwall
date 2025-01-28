import { render, screen } from "@testing-library/react"
import { SearchScreen } from "./search"
import { ReactNode } from "react"

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn((key) => (key === "q" ? "abc" : null)),
  })),
}))

jest.mock("next/form", () => ({ children }: { children: ReactNode }) => <form>{children}</form>)

describe("SearchScreen", () => {
  it("renders the search input and button with correct attributes", async () => {
    render(<SearchScreen />)

    const searchInput = screen.getByRole("textbox", { name: "Search input" })
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute("id", "search-input")
    expect(searchInput).toHaveAttribute("name", "q")
    expect(searchInput).toHaveAttribute("placeholder", "Find next star ⭐")
    expect(searchInput).toHaveValue("abc")

    const searchButton = screen.getByRole("button", { name: "Search" })
    expect(searchButton).toBeInTheDocument()
    expect(searchButton).toHaveAttribute("type", "submit")
  })
})
