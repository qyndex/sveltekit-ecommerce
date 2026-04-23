import { test, expect } from "@playwright/test";

test("home page loads products", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1, h2").first()).toBeVisible();
});

test("login page accessible", async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page.getByLabel(/email/i)).toBeVisible();
});

test("signup page accessible", async ({ page }) => {
  await page.goto("/auth/signup");
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/confirm password/i)).toBeVisible();
});

test("login page has sign in button", async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
});

test("signup page links to login", async ({ page }) => {
  await page.goto("/auth/signup");
  await expect(page.getByRole("link", { name: /sign in/i })).toBeVisible();
});

test("login page links to signup", async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page.getByRole("link", { name: /sign up/i })).toBeVisible();
});
