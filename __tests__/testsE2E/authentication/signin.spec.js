import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  const baseUrl = "http://localhost:3000";
  let page;

  test.beforeEach(async ({ page: pageToGo }) => {
    page = pageToGo;
  });

  test("should display login form correctly", async () => {
    await page.goto(`${baseUrl}/auth/signin`);
    await expect(page.getByRole("heading", { value: "LOGIN" })).toBeVisible();

    expect(page.getByRole("textbox", { name: /email/i })).toBeVisible();
    expect(page.getByRole("textbox", { name: /password/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Enter/i })).toBeVisible();
  });

  test("should handle login success", async () => {
    await page.goto(`${baseUrl}/auth/signin`);
    // const mockData = {
    //   accessToken: "mock-token",
    //   user: { id: 1, username: "testuser" },
    // };

    // Mock the API response
    // page.context().addCookie({
    //   name: "accessToken",
    //   value: "mock-token",
    //   path: "/",
    //   sameSite: "lax",
    // });

    await page.getByLabel("Email").fill("danysantosmorel@gmail.com");
    await page.getByLabel("Password").fill("secret");
    await page.getByRole("button", { name: /Enter/i }).click();

    // Wait for redirect to home page
    await page.waitForURL(`${baseUrl}`);
    expect(page).toHaveURL(`${baseUrl}`);
  });

  test("should handle login error", async () => {
    // Clear any existing cookies
    // await page.context().cookies.clear();
    await page.goto(`${baseUrl}/auth/signin`);

    await page.getByLabel("Email").fill("invalid@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: /Enter/i }).click();

    // Wait for error message to appear
    const errorMessage = page.getByText(/Cannot find user/);
    await expect(errorMessage).toBeVisible();
  });

  test("should show loading state during login", async () => {
    await page.goto(`${baseUrl}/auth/signin`);
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: /Enter/i }).click();
    await expect(page.getByRole("button", { name: /Enter/i })).toBeDisabled();
  });
});
