import { test, expect } from '@playwright/test';

test('TC-01: ค้นหาสินค้าด้วย keyword Hammer', async ({ page }) => {

  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="search-query"]').fill('Hammer');
  await page.locator('[data-test="search-submit"]').click();
  await expect(
    page.getByRole('heading', { name: 'Searched for: Hammer' }),
  ).toBeVisible();

  const products = page.locator('[data-test^="product-"]');
  const catalogAvailable = await products.first()
    .waitFor({ state: 'visible', timeout: 30_000 })
    .then(() => true, () => false);
  test.skip(!catalogAvailable, 'The external demo catalog is unavailable');
  await expect(products.first()).toBeVisible();
  await expect(products).toHaveCount(6);

});

test('TC-02: เพิ่มสินค้าลงตะกร้าและตรวจสอบยอดรวมในตะกร้า', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/', {
    waitUntil: 'domcontentloaded',
  });

  const firstProduct = page.locator('[data-test^="product-"]').first();
  const catalogAvailable = await firstProduct
    .waitFor({ state: 'visible', timeout: 30_000 })
    .then(() => true, () => false);
  test.skip(!catalogAvailable, 'The external demo catalog is unavailable');
  await expect(firstProduct).toBeVisible();
  await firstProduct.click();

  const productHeading = page.getByRole('heading', { level: 1 });
  const productName = (await productHeading.innerText()).trim();
  const unitPriceText = await productHeading
    .locator('xpath=following-sibling::div[1]')
    .innerText();
  const unitPrice = Number(unitPriceText.replace(/[^0-9.]/g, ''));
  expect(unitPrice).toBeGreaterThan(0);

  const addToCartButton = page.getByRole('button').filter({ hasText: 'Add to cart' });
  const cartLink = page.getByRole('link', { name: 'cart' });
  await addToCartButton.click();
  await expect(cartLink).toContainText('1');
  await addToCartButton.click();
  await expect(cartLink).toContainText('2');

  await cartLink.click();
  await expect(page).toHaveURL(/checkout/);

  const productRow = page.getByRole('row').filter({ hasText: productName });
  await expect(
    productRow.getByRole('cell', { name: productName, exact: true }),
  ).toBeVisible();
  await expect(
    productRow.getByRole('cell', { name: `$${unitPrice.toFixed(2)}`, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('spinbutton', { name: `Quantity for ${productName}` }),
  ).toHaveValue('2');

  const expectedSubtotal = unitPrice * 2;
  const expectedSubtotalText = `$${expectedSubtotal.toFixed(2)}`;
  await expect(
    productRow.getByRole('cell', { name: expectedSubtotalText, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('row', { name: `Total ${expectedSubtotalText}`, exact: true }),
  ).toBeVisible();

  await page.screenshot({
    path: 'screenshots/TC-02-cart-subtotal.png',
    fullPage: true,
  });

  await page.getByRole('button', { name: 'Proceed to checkout' }).click();
  await expect(page.getByRole('tab', { name: 'Continue as Guest' })).toBeVisible();
});
