import { test, expect } from '@playwright/test';

test.describe('Home 頁面（複製工具）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./Home');
  });

  test('頁面基本元素正常顯示', async ({ page }) => {
    await expect(page.locator('.home')).toBeVisible();
    await expect(page.locator('input[placeholder="給個標題"]').first()).toBeVisible();
    await expect(page.locator('textarea[placeholder="要複製的文字"]').first()).toBeVisible();
  });

  test('可以新增複製項目', async ({ page }) => {
    const form = page.locator('.copy__form');
    await form.locator('input[placeholder="給個標題"]').fill('測試標題');
    await form.locator('textarea[placeholder="要複製的文字"]').fill('測試內容');
    await page.getByRole('button', { name: '確認' }).click();

    const items = page.locator('.copy__item');
    await expect(items).toHaveCount(2);
  });

  test('新增項目後表單自動清空', async ({ page }) => {
    const form = page.locator('.copy__form');
    await form.locator('input[placeholder="給個標題"]').fill('標題');
    await form.locator('textarea[placeholder="要複製的文字"]').fill('內容');
    await page.getByRole('button', { name: '確認' }).click();

    await expect(form.locator('input[placeholder="給個標題"]')).toHaveValue('');
    await expect(form.locator('textarea[placeholder="要複製的文字"]')).toHaveValue('');
  });

  test('可以刪除已新增的項目', async ({ page }) => {
    const form = page.locator('.copy__form');
    await form.locator('input[placeholder="給個標題"]').fill('待刪除');
    await form.locator('textarea[placeholder="要複製的文字"]').fill('內容');
    await page.getByRole('button', { name: '確認' }).click();

    const itemsBefore = await page.locator('.copy__item').count();
    await page.getByRole('button', { name: '刪除此列' }).first().click();
    const itemsAfter = await page.locator('.copy__item').count();

    expect(itemsAfter).toBeLessThan(itemsBefore);
  });
});
