import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"

import { Button } from "./button"

describe("Button component", () => {
  test("renders Button with default variant and size", () => {
    render(<Button>Default Button</Button>)

    const button = screen.getByRole("button", { name: /default button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("bg-primary text-primary-foreground")
    expect(button).toHaveClass("h-9 px-4 py-2")
  })

  test("renders Button with destructive variant", () => {
    render(<Button variant="destructive">Destructive Button</Button>)

    const button = screen.getByRole("button", { name: /destructive button/i })
    expect(button).toHaveClass("bg-destructive text-destructive-foreground")
    expect(button).toHaveClass("shadow-sm hover:bg-destructive/90")
  })

  test("renders Button with outline variant", () => {
    render(<Button variant="outline">Outline Button</Button>)

    const button = screen.getByRole("button", { name: /outline button/i })
    expect(button).toHaveClass("border border-input bg-background")
    expect(button).toHaveClass("shadow-sm hover:bg-accent hover:text-accent-foreground")
  })

  test("renders Button with custom size", () => {
    render(<Button size="lg">Large Button</Button>)

    const button = screen.getByRole("button", { name: /large button/i })
    expect(button).toHaveClass("h-10 rounded-md px-8")
  })

  test("renders Button with icon size", () => {
    render(<Button size="icon" aria-label="Icon Button" />)

    const button = screen.getByRole("button", { name: /icon button/i })
    expect(button).toHaveClass("h-9 w-9")
  })

  test("applies custom class names to Button", () => {
    render(<Button className="custom-class">Custom Button</Button>)

    const button = screen.getByRole("button", { name: /custom button/i })
    expect(button).toHaveClass("custom-class")
  })

  test("renders Button as a child component", () => {
    render(
      <Button asChild>
        <a href="#">Child Button</a>
      </Button>
    )

    const link = screen.getByRole("link", { name: /child button/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass("bg-primary text-primary-foreground")
  })

  test("triggers onClick event", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clickable Button</Button>)

    const button = screen.getByRole("button", { name: /clickable button/i })
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test("disables Button when disabled prop is set", () => {
    render(<Button disabled>Disabled Button</Button>)

    const button = screen.getByRole("button", { name: /disabled button/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:pointer-events-none disabled:opacity-50")
  })
})
