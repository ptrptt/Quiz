# Quiz — Automated Testing (Playwright)

Automated test scripts เขียนด้วย **Playwright (TypeScript)**  
สำหรับทดสอบการทำงานของ Web Application

## Test Files

| ไฟล์ที่ทดสอบ | รายละเอียด |
|---|---|
| `tests/example.spec.ts` | ทดสอบการค้นหาและการทำงานเกี่ยวกับสินค้า |
| `tests/cart.spec.ts` | ทดสอบการเพิ่มสินค้าลงตะกร้าและ Checkout |
| `tests/register.spec.ts` | ทดสอบการสมัครสมาชิก |

## 1. Product Search

ทดสอบการค้นหาสินค้าและตรวจสอบผลลัพธ์ที่แสดงบนหน้าเว็บไซต์

| Test Case | Expected Result |
|---|---|
| ค้นหาสินค้าด้วยข้อมูลที่กำหนด | ระบบแสดงสินค้าที่ตรงกับการค้นหา |
| เลือกสินค้าจากผลการค้นหา | ระบบแสดงรายละเอียดสินค้าที่เลือก |

## 2. Cart & Checkout

ทดสอบการทำงานของตะกร้าสินค้า ตั้งแต่การเพิ่มสินค้าจนถึงขั้นตอน Checkout

| Test Case | Expected Result |
|---|---|
| เพิ่มสินค้าลงตะกร้า | สินค้าที่เลือกถูกเพิ่มลงใน Cart |
| ตรวจสอบสินค้าใน Cart | ระบบแสดงข้อมูลสินค้าที่เพิ่มไว้อย่างถูกต้อง |
| ดำเนินการ Checkout | ระบบสามารถเข้าสู่ขั้นตอน Checkout ได้ |

## 3. Register

ทดสอบการสมัครสมาชิกของผู้ใช้งาน

| Test Case | Expected Result |
|---|---|
| กรอกข้อมูลสมัครสมาชิก | ระบบรับข้อมูลที่ผู้ใช้กรอก |
| กดยืนยันการสมัครสมาชิก | ระบบดำเนินการสมัครสมาชิกตามข้อมูลที่กำหนด |

## Automated Testing

ใช้ **Playwright** สำหรับสร้าง Automated Test Scripts และใช้ `expect()` เพื่อตรวจสอบว่า Actual Result ตรงกับ Expected Result

ตัวอย่าง:

```typescript
await expect(page).toHaveURL(/checkout/);
```

## Screenshot

ใช้ `page.screenshot()` สำหรับบันทึกหลักฐานผลการทดสอบ

```typescript
await page.screenshot({
  path: 'screenshots/test-result.png',
  fullPage: true
});
```

## วิธีรัน

ติดตั้ง Dependencies

```bash
npm install
```

ติดตั้ง Playwright Browser

```bash
npx playwright install
```

รัน Automated Test ทั้งหมด

```bash
npx playwright test
```

รันเฉพาะ Test File

```bash
npx playwright test tests/example.spec.ts
npx playwright test tests/cart.spec.ts
npx playwright test tests/register.spec.ts
```

ดูผลการทดสอบผ่าน HTML Report

```bash
npx playwright show-report
```

## Tools

- Playwright
- TypeScript
- Automated Testing
- Assertion
- Screenshot
- HTML Report
