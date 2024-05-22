import { test, expect } from "@playwright/test";
import { faker } from '@faker-js/faker/locale/en';

const fakeName = faker.person.fullName(); 
const fakePassword = faker.string.alphanumeric();

test.describe("DemoBlaze UI tests", () => {
  test("Should be able to login", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");

    await page.getByRole("link", { name: "Log in" }).click();
    await page.locator("#loginusername").click();
    await page.locator("#loginusername").fill("username");
    await page.locator("#loginusername").press("Tab");
    await page.locator("#loginpassword").fill("password");
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(
      page.getByRole("link", { name: "PRODUCT STORE" })
    ).toBeVisible();
  });

  
  test("Should be able to send message to support team", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Contact" }).click();
    await page.locator("#recipient-email").click();
    await page.locator("#recipient-email").fill("something@email.com");
    await page.locator("#recipient-email").press("Tab");
    await page.getByLabel("Contact Email:").fill("To");
    await page.getByLabel("Contact Email:").click();
    await page.getByLabel("Contact Email:").fill("leonardo da vinci");
    await page
      .getByLabel("Message:")
      .fill("Why is my order taking so long to be delivered");
    await page.getByRole("button", { name: "Send message" }).click();
  });

  test("Should be able to register and log in", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    await page.getByRole("link", { name: "Sign up" }).click();
    await page.locator("#sign-username").click();
    await page.locator("#sign-username").fill(fakeName);
    await page.locator("#sign-username").press("Tab");
    await page.locator("#sign-password").fill("To");
    await page.locator("#sign-password").click();
    await page.locator("#sign-password").fill(fakePassword);
    await page.getByRole("button", { name: "Sign up" }).click();
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await page.getByRole("link", { name: "Log in" }).click();
    await page.locator("#loginusername").click();
    await page.locator("#loginusername").fill(fakeName);
    await page.locator("#loginusername").press("Tab");
    await page.locator("#loginpassword").fill(fakePassword);
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(
      page.getByRole("link", { name: "PRODUCT STORE" })
    ).toBeVisible();
  });

  test("[Bugged] Should be able to purchase the first product on the storefront", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    //dom navigation for dynamic selection of object, regardless of loaded objects on page
    await page.locator("#tbodyid > div:nth-child(1) > div > div > h4 > a").click();
    let product = page.locator("#name").textContent();
    //Playwright clicking on the following button renders the application unresponsive 
    await page.getByText("Add to cart").click();
    await page.waitForTimeout(2000);
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await page.getByRole("link", { name: "Cart" }).click();
    await expect(page.locator('#table-responsive')).toHaveText('${product}');
  });

  test("Should be able to log in, then out", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");

    await page.getByRole("link", { name: "Log in" }).click();
    await page.locator("#loginusername").click();
    await page.locator("#loginusername").fill("username");
    await page.locator("#loginusername").press("Tab");
    await page.locator("#loginpassword").fill("password");
    await page.getByRole("button", { name: "Log in" }).click();
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await expect(
      page.getByRole("link", { name: "PRODUCT STORE" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Welcome username" })
    ).toBeVisible();
    await page.getByRole("link", {name: "Log out"}).click();
    await expect(
      page.getByRole("link", { name: "sign up" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Welcome username" })
    ).toBeHidden();
  });

  test("Should have username/password validation ", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    //incorrect password validation
    await page.getByRole("link", { name: "Log in" }).click();
    await page.locator("#loginusername").click();
    await page.locator("#loginusername").fill("username");
    await page.locator("#loginusername").press("Tab");
    await page.locator("#loginpassword").fill("incorrect");
    await page.getByRole("button", { name: "Log in" }).click();
    page.on('dialog', async dialog => {
      expect(dialog.type()).toContain("Wrong password.");
      await dialog.accept();
    });

    //incorrect user validation
    await page.locator("#loginusername").click();
    await page.locator("#loginusername").fill("incorrect");
    await page.locator("#loginusername").press("Tab");
    await page.locator("#loginpassword").fill("password");
    page.on('dialog', async dialog => {
      expect(dialog.type()).toContain("User does not exist.");
      await dialog.accept();
    });
  });
  
  test("Should have duplicate user validation ", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");
    //duplicate user validation
    await page.getByRole("link", { name: "Sign up" }).click();
    await page.locator("#sign-username").click();
    await page.locator("#sign-username").fill("username");
    await page.locator("#sign-username").press("Tab");
    await page.locator("#sign-password").fill("To");
    await page.locator("#sign-password").click();
    await page.locator("#sign-password").fill("password");
    await page.getByRole("button", { name: "Sign up" }).click();
    page.on('dialog', async dialog => {
      expect(dialog.type()).toContain("This user already exist.")
      await dialog.accept();
    });
  });

});