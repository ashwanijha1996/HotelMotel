import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
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
})

test("Should fill up add hotels form fields and add hotel to db successfully", async ({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("test-city");
    await page.selectOption('select[name="country"]', "India");
    await page.locator('[name="description"]').fill("This is test hotel");
    await page.locator('[name="pricePerNight"]').fill("5000");
    await page.selectOption('select[name="starRating"]', "5");
    await page.getByText('Luxury').click();
    await page.getByLabel('Free Wi-Fi').check();
    await page.getByLabel('Parking').check();
    await page.getByLabel('Fitness Center').check();
    await page.locator('[name="adultCount"]').fill("5");
    await page.locator('[name="childCount"]').fill("2");
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "photo-1.avif"),
        path.join(__dirname, "files", "photo-2.jpg"),
        path.join(__dirname, "files", "photo-3.jpeg")
    ]);

    page.getByRole("button", { name: "Add Hotel" }).click();
    await expect(page.getByText("Hotel saved successfully")).toBeVisible({ timeout: 20000 });
});

test("Should test view hotel page is displayed correctly", async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`);
    await expect(page.getByText("Test Hotel")).toHaveCount(4);
    await expect(page.getByText("This is test hotel")).toHaveCount(2);
    await expect(page.getByText("test-city, India")).toHaveCount(2);
    await expect(page.getByText("Luxury")).toHaveCount(2);
    await expect(page.getByText("₹5000 / night")).toHaveCount(2);
    await expect(page.getByText("5 Adults, 2 Children")).toHaveCount(2);
    await expect(page.getByText("5 Star Rating")).toHaveCount(2);

    await page.getByRole("link", { name: "View Details" }).first().click();

    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("Should update hotel", async ({ page }) => {
    const randomNumber = Math.floor(Math.random() * 10);

    await page.goto(`${UI_URL}/my-hotels`);

    await page.getByRole("link", { name: "View Details" }).first().click();

    await page.waitForSelector('[name="name"]', { state: "attached" });
    await expect(page.locator('[name="name"]')).toHaveValue('Test Hotel');
    await page.locator('[name="name"]').fill(`Test Hotel-${randomNumber}`);
    await page.getByRole("button", { name: "Update Hotel" }).click();
    await expect(page.getByText("Hotel updated successfully")).toBeVisible();  //{ timeout: 20000 }
    await page.getByRole("button", { name: "Back" }).click();
    await page.getByRole("link", { name: "View Details" }).first().click();
    await page.waitForSelector('[name="name"]', { state: "attached" });
    await expect(page.locator('[name="name"]')).toHaveValue(`Test Hotel-${randomNumber}`);
    await page.locator('[name="name"]').fill(`Test Hotel`);
    await page.getByRole("button", { name: "Update Hotel" }).click();
    await expect(page.getByText("Hotel updated successfully")).toBeVisible();
    await page.getByRole("button", { name: "Back" }).click();
    await expect(page.getByText("Test Hotel")).toHaveCount(4);
});