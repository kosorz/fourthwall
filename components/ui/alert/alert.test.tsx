import React from "react"
import { render, screen } from "@testing-library/react"

import { Alert, AlertTitle, AlertDescription } from "./alert"

describe("Alert components", () => {
  test("renders Alert with default variant", () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    )

    const alert = screen.getByRole("alert")
    expect(alert).toBeInTheDocument()
    expect(alert).toHaveClass("bg-background text-foreground")
    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
  })

  test("renders Alert with destructive variant", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Destructive Title</AlertTitle>
        <AlertDescription>Destructive Description</AlertDescription>
      </Alert>
    )

    const alert = screen.getByRole("alert")
    expect(alert).toHaveClass("border-destructive/50 text-destructive")
    expect(screen.getByText("Destructive Title")).toBeInTheDocument()
    expect(screen.getByText("Destructive Description")).toBeInTheDocument()
  })

  test("applies custom class names to Alert", () => {
    render(<Alert className="custom-class">Custom Alert</Alert>)

    const alert = screen.getByRole("alert")
    expect(alert).toHaveClass("custom-class")
  })

  test("renders AlertTitle with custom className", () => {
    render(<AlertTitle className="custom-title">Custom Title</AlertTitle>)

    const title = screen.getByText("Custom Title")
    expect(title).toHaveClass("custom-title")
    expect(title).toHaveClass("font-medium text-xl")
  })

  test("renders AlertDescription with custom className", () => {
    render(<AlertDescription className="custom-description">Custom Description</AlertDescription>)

    const description = screen.getByText("Custom Description")
    expect(description).toHaveClass("custom-description")
    expect(description).toHaveClass("text-sm")
  })

  test("Alert contains AlertTitle and AlertDescription", () => {
    render(
      <Alert>
        <AlertTitle>Contained Title</AlertTitle>
        <AlertDescription>Contained Description</AlertDescription>
      </Alert>
    )

    const alert = screen.getByRole("alert")
    expect(alert).toContainElement(screen.getByText("Contained Title"))
    expect(alert).toContainElement(screen.getByText("Contained Description"))
  })
})
