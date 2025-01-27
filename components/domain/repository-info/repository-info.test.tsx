import React from "react"
import { render, screen } from "@testing-library/react"

import { RepositoryInfo } from "./repository-info"

const mockRepo = {
  owner: { login: "test-owner" },
  id: "1",
  stargazerCount: 1234,
  createdAt: "2022-01-01T00:00:00Z",
  description: "Test repository",
  name: "test-repo",
}

describe("RepositoryInfo component", () => {
  test("renders repository information correctly", () => {
    render(<RepositoryInfo {...mockRepo} />)

    const info = screen.getByText(
      /This repository has 1k star\/s, is owned by test-owner and was created at 1\.01\.2022/i
    )

    expect(info).toBeInTheDocument()
  })

  test("handles missing owner gracefully", () => {
    const repoWithUnknownOwner = { ...mockRepo, owner: { login: "" } }
    render(<RepositoryInfo {...repoWithUnknownOwner} />)

    const info = screen.getByText(/is owned by unknown author/i)
    expect(info).toBeInTheDocument()
  })

  test("handles missing createdAt gracefully", () => {
    const repoWithUnknownDate = { ...mockRepo, createdAt: "" }
    render(<RepositoryInfo {...repoWithUnknownDate} />)

    const info = screen.getByText(/was created at Invalid Date/i)
    expect(info).toBeInTheDocument()
  })
})
