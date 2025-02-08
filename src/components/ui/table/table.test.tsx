import React from "react"
import { render, screen } from "@testing-library/react"

import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption, TableLinkCell } from "./table"

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

  test("renders TableLinkCell with provided href and children", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableLinkCell href="/test">Test Link</TableLinkCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    const link = screen.getByText("Test Link")
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
  })
})
