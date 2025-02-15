import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"

import { GithubRepositoriesPagination } from "./gitthub-repositories-pagination"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}))

jest.mock("nextjs-toploader/app", () => ({
  useRouter: jest.fn(),
}))

describe("GithubRepositoriesPagination component", () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const defaultProps = {
    startCursor: "start-cursor",
    endCursor: "end-cursor",
    hasNextPage: true,
    hasPreviousPage: true,
  }

  test("renders pagination controls correctly", () => {
    render(<GithubRepositoriesPagination pageInfo={defaultProps} />)

    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument()
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument()
  })

  test("disables previous button if hasPreviousPage is false", () => {
    render(<GithubRepositoriesPagination pageInfo={{ ...defaultProps, hasPreviousPage: false }} />)

    const previousButton = screen.getByLabelText("Go to previous page")
    expect(previousButton).toHaveAttribute("aria-disabled", "true")
  })

  test("disables next button if hasNextPage is false", () => {
    render(<GithubRepositoriesPagination pageInfo={{ ...defaultProps, hasNextPage: false }} />)

    const nextButton = screen.getByLabelText("Go to next page")
    expect(nextButton).toHaveAttribute("aria-disabled", "true")
  })

  test("calls router.push with correct parameters when next button is clicked", () => {
    render(<GithubRepositoriesPagination pageInfo={defaultProps} />)

    const nextButton = screen.getByLabelText("Go to next page")
    fireEvent.click(nextButton)

    expect(mockPush).toHaveBeenCalledWith("?startCursor=start-cursor&endCursor=end-cursor&direction=FORWARD")
  })

  test("calls router.push with correct parameters when previous button is clicked", () => {
    render(<GithubRepositoriesPagination pageInfo={defaultProps} />)

    const previousButton = screen.getByLabelText("Go to previous page")
    fireEvent.click(previousButton)

    expect(mockPush).toHaveBeenCalledWith("?startCursor=start-cursor&endCursor=end-cursor&direction=BACKWARD")
  })

  test("does not call router.push when disabled next button is clicked", () => {
    render(<GithubRepositoriesPagination pageInfo={{ ...defaultProps, hasNextPage: false }} />)

    const nextButton = screen.getByLabelText("Go to next page")
    fireEvent.click(nextButton)

    expect(mockPush).not.toHaveBeenCalled()
  })

  test("does not call router.push when disabled previous button is clicked", () => {
    render(<GithubRepositoriesPagination pageInfo={{ ...defaultProps, hasPreviousPage: false }} />)

    const previousButton = screen.getByLabelText("Go to previous page")
    fireEvent.click(previousButton)

    expect(mockPush).not.toHaveBeenCalled()
  })

  test("does not render anything if both hasNextPage and hasPreviousPage are false", () => {
    const { container } = render(
      <GithubRepositoriesPagination pageInfo={{ ...defaultProps, hasPreviousPage: false, hasNextPage: false }} />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
