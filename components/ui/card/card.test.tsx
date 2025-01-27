import React from "react"
import { render, screen } from "@testing-library/react"

import { Card, CardHeader, CardTitle, CardContent } from "./card"

describe("Card components", () => {
  test("applies custom class names to Card", () => {
    render(<Card className="custom-class">Custom Card</Card>)

    const card = screen.getByText("Custom Card")
    expect(card).toHaveClass("custom-class")
  })

  test("renders CardHeader with default styles", () => {
    render(<CardHeader>Card Header</CardHeader>)

    const header = screen.getByText("Card Header")
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass("flex flex-col space-y-1.5 p-6")
  })

  test("applies custom class names to CardHeader", () => {
    render(<CardHeader className="custom-header">Header Content</CardHeader>)

    const header = screen.getByText("Header Content")
    expect(header).toHaveClass("custom-header")
  })

  test("renders CardTitle with default styles", () => {
    render(<CardTitle>Card Title</CardTitle>)

    const title = screen.getByText("Card Title")
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass("font-semibold leading-none tracking-tight")
  })

  test("applies custom class names to CardTitle", () => {
    render(<CardTitle className="custom-title">Custom Title</CardTitle>)

    const title = screen.getByText("Custom Title")
    expect(title).toHaveClass("custom-title")
  })

  test("renders CardContent with default styles", () => {
    render(<CardContent>Card Content</CardContent>)

    const content = screen.getByText("Card Content")
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass("p-6 pt-0")
  })

  test("applies custom class names to CardContent", () => {
    render(<CardContent className="custom-content">Custom Content</CardContent>)

    const content = screen.getByText("Custom Content")
    expect(content).toHaveClass("custom-content")
  })
})
