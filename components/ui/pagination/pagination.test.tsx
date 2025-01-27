import React from "react"
import { render, screen } from "@testing-library/react"

import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./pagination"

describe("Pagination components", () => {
  test("renders Pagination with default styles", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    const nav = screen.getByRole("navigation", { name: /pagination/i })
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass("mx-auto flex w-full justify-center")
  })

  test("renders PaginationContent with default styles", () => {
    render(
      <Pagination>
        <PaginationContent>Content</PaginationContent>
      </Pagination>
    )

    const content = screen.getByText("Content")
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass("flex flex-row items-center gap-1")
  })

  test("renders PaginationLink with active styles", () => {
    render(
      <PaginationLink href="#" isActive>
        Active Link
      </PaginationLink>
    )

    const link = screen.getByText("Active Link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("aria-current", "page")
    expect(link).toHaveClass("border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground")
  })

  test("renders PaginationPrevious with default styles", () => {
    render(<PaginationPrevious href="#" />)

    const previous = screen.getByLabelText("Go to previous page")
    expect(previous).toBeInTheDocument()
    expect(previous).toHaveClass("gap-1 pl-2.5 cursor-pointer")
    expect(previous).toContainElement(screen.getByText("Previous"))
  })

  test("renders PaginationNext with default styles", () => {
    render(<PaginationNext href="#" />)

    const next = screen.getByLabelText("Go to next page")
    expect(next).toBeInTheDocument()
    expect(next).toHaveClass("gap-1 pr-2.5 cursor-pointer")
    expect(next).toContainElement(screen.getByText("Next"))
  })

  test("renders PaginationItem with custom content", () => {
    render(
      <PaginationContent>
        <PaginationItem>Custom Item</PaginationItem>
      </PaginationContent>
    )

    const item = screen.getByText("Custom Item")
    expect(item).toBeInTheDocument()
  })

  test("renders multiple PaginationLinks within PaginationContent", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )

    const links = screen.getAllByRole("link")
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveTextContent("1")
    expect(links[1]).toHaveTextContent("2")
  })
})
