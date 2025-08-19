import { test, expect } from "@playwright/test";

test("app renders", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveTitle(/Urdu Number Trainer/);
  await expect(
    page.getByRole("heading", { name: "Urdu Number Trainer" }),
  ).toBeVisible();
});
