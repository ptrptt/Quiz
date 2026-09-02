import { test, expect } from '@playwright/test';

test('add a product to the cart and capture checkout', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/', {
    waitUntil: 'domcontentloaded',
  });

  const firstProduct = page.locator('[data-test^="product-"]').first();
  await expect(firstProduct).toBeVisible();
  await firstProduct.click();

  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await page.locator('[data-test="increase-quantity"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="nav-cart"]').click();

  await expect(page.locator('[data-test="proceed-1"]')).toBeVisible();
  await page.locator('[data-test="proceed-1"]').click();

  await expect(page).toHaveURL(/checkout/);

  await page.screenshot({
    path: 'screenshots/cart-checkout.png',
    fullPage: true,
  });
});
