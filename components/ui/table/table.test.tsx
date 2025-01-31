import React from "react"
import { render, screen } from "@testing-library/react"

import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "./table"

describe("Table components", () => {
  test("renders Table with default props", () => {
    render(
      <Table>
        <TableCaption>Test Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByText("Test Caption")).toBeInTheDocument()
    expect(screen.getByText("Header 1")).toBeInTheDocument()
    expect(screen.getByText("Header 2")).toBeInTheDocument()
    expect(screen.getByText("Cell 1")).toBeInTheDocument()
    expect(screen.getByText("Cell 2")).toBeInTheDocument()
  })

  test("applies custom class names to Table", () => {
    render(<Table className="custom-class" />)
    const table = screen.getByRole("table")
    expect(table).toHaveClass("custom-class")
  })

  test("renders TableHeader with custom className", () => {
    render(
      <TableHeader className="header-class">
        <TableRow>
          <TableHead>Header</TableHead>
        </TableRow>
      </TableHeader>
    )

    const header = screen.getByText("Header").closest("thead")
    expect(header).toHaveClass("header-class")
  })

  test("renders TableBody with custom className", () => {
    render(
      <TableBody className="body-class">
        <TableRow>
          <TableCell>Body Cell</TableCell>
        </TableRow>
      </TableBody>
    )

    const body = screen.getByText("Body Cell").closest("tbody")
    expect(body).toHaveClass("body-class")
  })

  test("renders TableRow and applies hover styles", () => {
    render(
      <TableBody>
        <TableRow className="row-class">
          <TableCell>Row Cell</TableCell>
        </TableRow>
      </TableBody>
    )

    const row = screen.getByText("Row Cell").closest("tr")
    expect(row).toHaveClass("row-class")
    expect(row).toHaveClass("border-b transition-colors row-class not:first:hover:bg-blue-50")
  })

  test("renders TableHead with default styles", () => {
    render(<TableHead>Head Cell</TableHead>)

    const head = screen.getByText("Head Cell")
    expect(head).toHaveClass("font-medium")
    expect(head).toHaveClass("text-muted-foreground")
  })

  test("renders TableCell with default styles", () => {
    render(<TableCell>Body Cell</TableCell>)

    const cell = screen.getByText("Body Cell")
    expect(cell).toHaveClass("p-2")
    expect(cell).toHaveClass("align-middle")
  })

  test("renders TableCaption with default styles", () => {
    render(<TableCaption>Caption Text</TableCaption>)

    const caption = screen.getByText("Caption Text")
    expect(caption).toHaveClass("text-sm")
    expect(caption).toHaveClass("text-muted-foreground")
  })

  test("ensures TableRow contains TableCell elements", () => {
    render(
      <TableBody>
        <TableRow>
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
        </TableRow>
      </TableBody>
    )

    const row = screen.getByText("Cell 1").closest("tr")
    expect(row).toContainElement(screen.getByText("Cell 1"))
    expect(row).toContainElement(screen.getByText("Cell 2"))
  })
})
