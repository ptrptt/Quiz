import { test, expect } from '@playwright/test';

test('TC-03: ตรวจสอบ validation ตอนลงทะเบียนเมื่อกรอกรหัสผ่านไม่ตรงเงื่อนไข', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/', {
    waitUntil: 'domcontentloaded',
  });

  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="register-link"]').click();

  await expect(page).toHaveURL(/register/);

  await page.getByRole('textbox', { name: 'First name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last name' }).fill('User');
  await page.getByRole('textbox', { name: 'Date of Birth' }).fill('2000-01-01');
  await page.getByRole('combobox', { name: 'Country' }).selectOption({ label: 'Thailand' });
  await page.getByRole('textbox', { name: 'Postal code' }).fill('50000');
  await page.getByRole('textbox', { name: 'House number' }).fill('123');
  await page.getByRole('textbox', { name: 'Street' }).fill('Test Street');
  await page.getByRole('textbox', { name: 'City' }).fill('Chiang Mai');
  await page.getByRole('textbox', { name: 'State' }).fill('Chiang Mai');
  await page.getByRole('textbox', { name: 'Phone' }).fill('0812345678');
  await page.getByRole('textbox', { name: 'Email address' }).fill('test@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123');

  await page.getByRole('button', { name: 'Register' }).click();

  const passwordError = page.locator('[data-test="password-error"]');
  await expect(passwordError).toBeVisible();
  await expect(passwordError).not.toBeEmpty();
  await expect(page).toHaveURL(/register/);

  await page.screenshot({
    path: 'screenshots/TC-03-invalid-password.png',
    fullPage: true,
  });
});
