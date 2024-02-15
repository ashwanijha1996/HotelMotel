import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("ash.6991.aj@gmail.com");
  await page.locator("[name=password]").fill("Abcd1234!!");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Logged in successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should register new user", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 11000}@test.com`

  await page.goto(UI_URL);
  await page.getByRole('link', { name: "Sign In" }).click();
  await expect(page.getByRole('heading', { name: "Sign In" })).toBeVisible();
  await page.getByRole('link', { name: "Create an account here" }).click();
  await expect(page.getByRole('heading', { name: "Create an Account" })).toBeVisible();

  await page.locator("[name=firstName]").fill('test');
  await page.locator("[name=lastName]").fill('test');
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill('test@123');
  await page.locator("[name=confirmPassword]").fill('test@123');

  await page.getByRole('button', { name: "Create Account" }).click();

  await expect(page.getByText("registration successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to sign out after login", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("ash.6991.aj@gmail.com");
  await page.locator("[name=password]").fill("Abcd1234!!");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Logged in successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();

  await page.getByRole("button", { name: "Sign Out" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

});


