import { render } from "@testing-library/react"
import { SearchScreen } from "./search"
import { ReactNode } from "react"

const props = {
  searchParams: Promise.resolve({
    q: "abc",
  }),
}

jest.mock("next/form", () => ({ children }: { children: ReactNode }) => <form>{children}</form>)

it("checks table", async () => {
  const Result = await SearchScreen(props)
  const screen = render(Result)

  expect(screen.getByRole("textbox", { name: "Search input" })).toBeInTheDocument()
  expect(screen.getByRole("textbox", { name: "Search input" })).toHaveAttribute("id", "search-input")
  expect(screen.getByRole("textbox", { name: "Search input" })).toHaveAttribute("name", "q")
  expect(screen.getByRole("textbox", { name: "Search input" })).toHaveAttribute(
    "placeholder",
    "Search for your next star ⭐"
  )
  expect(screen.getByRole("textbox", { name: "Search input" })).toHaveValue("abc")

  expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Search" })).toHaveAttribute("type", "submit")
})
