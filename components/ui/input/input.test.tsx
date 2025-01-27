import React from "react"
import { render, screen } from "@testing-library/react"

import { Input } from "./input"

describe("Input component", () => {
  test("renders Input with default styles", () => {
    render(<Input placeholder="Default Input" />)

    const input = screen.getByPlaceholderText("Default Input")
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors"
    )
    expect(input).toHaveClass(
      "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    )
  })

  test("applies custom class names to Input", () => {
    render(<Input className="custom-class" placeholder="Custom Class Input" />)

    const input = screen.getByPlaceholderText("Custom Class Input")
    expect(input).toHaveClass("custom-class")
  })

  test("renders Input with a specific type", () => {
    render(<Input type="password" placeholder="Password Input" />)

    const input = screen.getByPlaceholderText("Password Input")
    expect(input).toHaveAttribute("type", "password")
  })

  test("renders Input with disabled state", () => {
    render(<Input disabled placeholder="Disabled Input" />)

    const input = screen.getByPlaceholderText("Disabled Input")
    expect(input).toBeDisabled()
    expect(input).toHaveClass("disabled:cursor-not-allowed disabled:opacity-50")
  })

  test("renders Input with file-specific styles for type 'file'", () => {
    render(<Input type="file" data-testid="file-input" />)

    const input = screen.getByTestId("file-input")
    expect(input).toHaveClass("file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground")
  })

  test("applies additional props to Input", () => {
    render(<Input aria-label="Custom Input" />)

    const input = screen.getByLabelText("Custom Input")
    expect(input).toBeInTheDocument()
  })
})
