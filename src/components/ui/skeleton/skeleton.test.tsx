import React from "react"
import { render, screen } from "@testing-library/react"

import { Skeleton } from "./skeleton"

describe("Skeleton component", () => {
  test("renders additional props on Skeleton", () => {
    render(<Skeleton data-testid="skeleton" aria-label="Loading skeleton" />)

    const skeleton = screen.getByLabelText("Loading skeleton")
    expect(skeleton).toBeInTheDocument()
  })
})
