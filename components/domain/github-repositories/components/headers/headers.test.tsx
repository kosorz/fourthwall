import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Headers } from "./headers"
import { useRouter, useSearchParams } from "next/navigation"
import { SortDirections } from "@/lib/types/github"

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

describe("Headers component", () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    ;(useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams({ sort: SortDirections.StarsDesc, q: "test-query" })
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test("renders all headers correctly", () => {
    render(<Headers />)

    expect(screen.getByText("User")).toBeInTheDocument()
    expect(screen.getByText("Stars")).toBeInTheDocument()
    expect(screen.getByText("Created at")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
  })

  test("calls router.push with correct params when sorting by stars", () => {
    render(<Headers />)

    const starsButton = screen.getByText("Stars")
    fireEvent.click(starsButton)

    expect(mockPush).toHaveBeenCalledWith(`?sort=${SortDirections.StarsAsc}&q=test-query`)
  })

  test("calls router.push with correct params when sorting by name", () => {
    render(<Headers />)

    const nameButton = screen.getByText("Name")
    fireEvent.click(nameButton)

    expect(mockPush).toHaveBeenCalledWith(`?sort=${SortDirections.NameDesc}&q=test-query`)
  })

  test("toggles sorting direction for stars correctly", () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams({ sort: SortDirections.StarsAsc, q: "test-query" })
    )

    render(<Headers />)

    const starsButton = screen.getByText("Stars")
    fireEvent.click(starsButton)

    expect(mockPush).toHaveBeenCalledWith(`?sort=${SortDirections.StarsDesc}&q=test-query`)
  })

  test("toggles sorting direction for name correctly", () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams({ sort: SortDirections.NameAsc, q: "test-query" })
    )

    render(<Headers />)

    const nameButton = screen.getByText("Name")
    fireEvent.click(nameButton)

    expect(mockPush).toHaveBeenCalledWith(`?sort=${SortDirections.NameDesc}&q=test-query`)
  })
})
