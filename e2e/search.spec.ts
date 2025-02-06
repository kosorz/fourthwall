import { test, expect } from "@playwright/test"

test.describe("Fourthwall x GitHub Integration Page", () => {
  test("renders the logos and navigates to home on click", async ({ page }) => {
    await page.goto("https://fourthwall.netlify.app/")

    const fourthwallLogo = page.locator("img[alt='Fourthwall logo']")
    const githubLogo = page.locator("img[alt='GitHub logo']")

    await expect(fourthwallLogo).toBeVisible()
    await expect(githubLogo).toBeVisible()

    const logoLink = page.locator("a[href='/']")
    await logoLink.click()

    await expect(page).toHaveURL("https://fourthwall.netlify.app/")
  })

  test("search functionality works correctly", async ({ page }) => {
    await page.goto("https://fourthwall.netlify.app/")

    const searchInput = page.locator("#search-input")
    const searchButton = page.locator("button[type='submit']")

    await expect(searchInput).toBeVisible()
    await expect(searchButton).toBeVisible()

    await searchInput.fill("playwright")
    await searchButton.click()

    await expect(page).toHaveURL(/\?q=playwright/)
  })
})
