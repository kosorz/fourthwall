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
