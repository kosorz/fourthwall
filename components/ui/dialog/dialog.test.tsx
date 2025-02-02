import React from "react"
import { render, screen } from "@testing-library/react"

import {
  Dialog,
  DialogPortal,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog"

jest.mock("nextjs-toploader/app", () => ({
  useRouter: jest.fn().mockReturnValue({ back: jest.fn() }),
}))

afterEach(() => {
  jest.clearAllMocks()
})

describe("Dialog components", () => {
  test("renders DialogHeader with default styles", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title Content</DialogTitle>
          <DialogHeader>Header Content</DialogHeader>
          <DialogDescription>Description Content</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    const header = screen.getByText("Header Content")
    expect(header).toHaveClass("flex flex-col space-y-1.5 text-center sm:text-left")
  })

  test("renders HistoryClose with default styles", () => {
    render(
      <Dialog open>
        <DialogTitle>With History Close</DialogTitle>
        <DialogContent withHistoryBackClose />
        <DialogDescription>Description Content</DialogDescription>
      </Dialog>
    )

    const Close = screen.getByText("Close")
    expect(Close).toBeDefined()
  })

  test("renders DialogTitle with default styles", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title Content</DialogTitle>
          <DialogDescription>Description Content</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    const title = screen.getByText("Title Content")
    expect(title).toHaveClass("text-lg font-semibold leading-none tracking-tight")
  })

  test("renders DialogDescription with default styles", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title Content</DialogTitle>
          <DialogDescription>Description Content</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    const description = screen.getByText("Description Content")
    expect(description).toHaveClass("text-sm text-muted-foreground")
  })

  test("renders DialogFooter with default styles", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title Content</DialogTitle>
          <DialogFooter>Footer Content</DialogFooter>
          <DialogDescription>Description Content</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    const footer = screen.getByText("Footer Content")
    expect(footer).toHaveClass("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2")
  })

  test("DialogContent renders children correctly", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Title Content</DialogTitle>
          <div>Child Content</div>
          <DialogDescription>Description Content</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    const child = screen.getByText("Child Content")
    expect(child).toBeInTheDocument()
  })

  test("Dialog components render inside DialogPortal", () => {
    render(
      <Dialog open>
        <DialogPortal>
          <DialogContent>
            <DialogTitle>Title Content</DialogTitle>
            <div>Portal Content</div>
            <DialogDescription>Description Content</DialogDescription>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )

    const portalContent = screen.getByText("Portal Content")
    expect(portalContent).toBeInTheDocument()
  })
})
