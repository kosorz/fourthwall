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

    const label = screen.getByLabelText(/Search repositories by name, author and more.../i)
    expect(label).toBeInTheDocument()

    const searchButton = screen.getByRole("button", { name: "Search" })
    expect(searchButton).toBeInTheDocument()
    expect(searchButton).toHaveAttribute("type", "submit")

    const linkElement = screen.getByRole("link", { name: /cheat-sheet/i })
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute(
      "href",
      "https://www.freecodecamp.org/news/github-search-tips/#:~:text=How%20to%20Search%20Repositories"
    )
    expect(linkElement).toHaveAttribute("target", "__blank")
    expect(linkElement).toHaveTextContent("Psst.. here's a cheat-sheet!")
  })
})
