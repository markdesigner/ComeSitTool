import { test, expect } from '@playwright/test';

test.describe('ComeSitTool 頁面', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
  });

  test('頁面基本元素正常顯示', async ({ page }) => {
    await expect(page.locator('.CopyTool')).toBeVisible();
    await expect(page.locator('input[placeholder="人數"]')).toBeVisible();
    await expect(page.locator('input[placeholder="人名"]')).toBeVisible();
    await expect(page.locator('input[placeholder="電子鎖密碼"]')).toBeVisible();
  });

  test('人數輸入欄位可以修改數值', async ({ page }) => {
    const input = page.locator('input[placeholder="人數"]');
    await input.fill('10');
    await expect(input).toHaveValue('10');
  });

  test('人名輸入欄位可以輸入文字', async ({ page }) => {
    const input = page.locator('input[placeholder="人名"]');
    await input.fill('測試客人');
    await expect(input).toHaveValue('測試客人');
  });

  test('電子鎖密碼欄位可以輸入', async ({ page }) => {
    const input = page.locator('input[placeholder="電子鎖密碼"]');
    await input.fill('1234');
    await expect(input).toHaveValue('1234');
  });

  test('場次選擇下拉選單可以切換', async ({ page }) => {
    const select = page.locator('.periodSelect-container select');
    await expect(select).toHaveValue('whole');

    await select.selectOption('morning');
    await expect(select).toHaveValue('morning');

    await select.selectOption('evening');
    await expect(select).toHaveValue('evening');
  });

  test('「產生文字與複製」按鈕可點擊且產生文字', async ({ page }) => {
    await page.locator('input[placeholder="人名"]').fill('王小明');
    await page.locator('input[placeholder="電子鎖密碼"]').fill('5678');

    await page.getByRole('button', { name: '產生文字與複製' }).click();

    const textarea = page.locator('textarea.CopyTool__textBlock');
    await expect(textarea).not.toHaveValue('');
  });

  test('V2 預約文字可以生成', async ({ page }) => {
    const peopleInput = page.locator('input[placeholder="人數"]');
    await peopleInput.fill('8');

    await page.locator('.booking-container button', { hasText: '一鍵生成與複製' }).click();

    const textarea = page.locator('textarea.copyArea');
    await expect(textarea).not.toHaveValue('');
  });

  test('日期選擇器正常顯示', async ({ page }) => {
    await expect(page.locator('.vc-container').first()).toBeVisible();
  });
});
