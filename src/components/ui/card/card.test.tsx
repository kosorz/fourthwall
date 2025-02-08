import React from "react"
import { render, screen } from "@testing-library/react"

import { CardHeader, CardTitle, CardContent } from "./card"

describe("Card components", () => {
  test("renders CardHeader with default styles", () => {
    render(<CardHeader>Card Header</CardHeader>)

    const header = screen.getByText("Card Header")
    expect(header).toBeInTheDocument()
  })

  test("renders CardTitle with default styles", () => {
    render(<CardTitle>Card Title</CardTitle>)

    const title = screen.getByText("Card Title")
    expect(title).toBeInTheDocument()
  })
})
