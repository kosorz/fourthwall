import React from "react"
import { render, screen } from "@testing-library/react"

import { Input } from "./input"

describe("Input component", () => {
  test("renders Input with default styles", () => {
    render(<Input placeholder="Default Input" />)

    const input = screen.getByPlaceholderText("Default Input")
    expect(input).toBeInTheDocument()
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
  })

  test("applies additional props to Input", () => {
    render(<Input aria-label="Custom Input" />)

    const input = screen.getByLabelText("Custom Input")
    expect(input).toBeInTheDocument()
  })
})
