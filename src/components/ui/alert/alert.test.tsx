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

    expect(screen.getByText("Destructive Title")).toBeInTheDocument()
    expect(screen.getByText("Destructive Description")).toBeInTheDocument()
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
