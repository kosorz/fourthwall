import { render, screen, fireEvent } from "@testing-library/react"

import { ProblemAlert } from "./problem-alert"
import { FaExclamationCircle } from "react-icons/fa"
import { Button } from "@/src/components/ui/button/button"

describe("ProblemAlert component", () => {
  const mockReset = jest.fn()
  const props = {
    title: "Error Title",
    description: "Error description goes here.",
    Icon: <FaExclamationCircle data-testid="icon" />,
    actionSlot: <Button onClick={mockReset}>Try again</Button>,
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
  })

  test("calls the reset function when the Try Again button is clicked", () => {
    render(<ProblemAlert {...props} />)

    const button = screen.getByRole("button", { name: /try again/i })
    fireEvent.click(button)

    expect(mockReset).toHaveBeenCalledTimes(1)
  })
})
