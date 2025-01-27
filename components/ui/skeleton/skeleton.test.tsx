import React from "react"
import { render, screen } from "@testing-library/react"

import { Skeleton } from "./skeleton"

describe("Skeleton component", () => {
  test("renders Skeleton with default styles", () => {
    render(<Skeleton data-testid="skeleton" />)

    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass("animate-pulse rounded-md bg-primary/10")
  })

  test("applies custom class names to Skeleton", () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />)

    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton).toHaveClass("custom-class")
  })

  test("renders additional props on Skeleton", () => {
    render(<Skeleton data-testid="skeleton" aria-label="Loading skeleton" />)

    const skeleton = screen.getByLabelText("Loading skeleton")
    expect(skeleton).toBeInTheDocument()
  })

  test("renders Skeleton with dynamic content styles", () => {
    render(<Skeleton className="w-20 h-5" data-testid="skeleton" />)

    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton).toHaveClass("w-20 h-5")
  })
})
