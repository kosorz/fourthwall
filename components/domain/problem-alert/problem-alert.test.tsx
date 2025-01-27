import { render, screen, fireEvent } from "@testing-library/react"

import { ProblemAlert } from "./problem-alert"
import { FaExclamationCircle } from "react-icons/fa"

describe("ProblemAlert component", () => {
  const mockReset = jest.fn()
  const props = {
    title: "Error Title",
    description: "Error description goes here.",
    Icon: <FaExclamationCircle data-testid="icon" />,
    reset: mockReset,
  }

  test("renders title, description, and icon correctly", () => {
    render(<ProblemAlert {...props} />)

    const title = screen.getByText("Error Title")
    const description = screen.getByText("Error description goes here.")
    const icon = screen.getByTestId("icon")

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  test("renders the Try Again button", () => {
    render(<ProblemAlert {...props} />)

    const button = screen.getByRole("button", { name: /try again/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("mt-3 ml-6")
  })

  test("calls the reset function when the Try Again button is clicked", () => {
    render(<ProblemAlert {...props} />)

    const button = screen.getByRole("button", { name: /try again/i })
    fireEvent.click(button)

    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  test("applies the correct styles to the Alert component", () => {
    render(<ProblemAlert {...props} />)

    const alert = screen.getByRole("alert")
    expect(alert).toHaveClass("mt-5")
    expect(alert).toHaveClass(
      "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg~*]:pl-7 border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive mt-5"
    )
  })
})
