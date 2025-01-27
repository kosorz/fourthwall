import { test, expect } from "@playwright/test"

test.describe("GitHub Repository Table - Fourthwall", () => {
  test("verifies the table content and navigates to the next page", async ({ page }) => {
    await page.goto("https://fourthwall-seven.vercel.app/?q=github")

    const fourthwallLogo = page.locator("img[alt='Fourthwall logo']")
    const githubLogo = page.locator("img[alt='GitHub logo']")
    await expect(fourthwallLogo).toBeVisible()
    await expect(githubLogo).toBeVisible()

    await expect(page.getByText("User")).toBeVisible()
    await expect(page.getByText("Stars")).toBeVisible()
    await expect(page.getByText("Created at")).toBeVisible()
    await expect(page.getByText("Name")).toBeVisible()

    const rows = page.locator("tbody tr")
    const firstPageData = await rows.allTextContents()

    const previousButton = page.locator("a[aria-label='Go to previous page']")
    const nextButton = page.locator("a[aria-label='Go to next page']")

    await expect(previousButton).toHaveAttribute("aria-disabled", "true")
    await expect(nextButton).toHaveAttribute("aria-disabled", "false")

    await nextButton.click()

    await expect(page).toHaveURL(/direction=FORWARD/)

    const updatedRows = page.locator("tbody tr")
    const secondPageData = await updatedRows.allTextContents()

    expect(secondPageData).not.toEqual(firstPageData)
  })
})
