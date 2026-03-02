import { test, expect } from '@playwright/test';

test.describe('HouseTool 頁面', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./HouseTool');
  });

  test('頁面基本元素正常顯示', async ({ page }) => {
    await expect(page.locator('.HouseTool')).toBeVisible();
    await expect(page.locator('input[placeholder="建商名聲 or 建案全名"]')).toBeVisible();
    await expect(page.locator('.question-text')).toHaveText('寶咖咖嗎？');
  });

  test('預設值顯示為「順天建設」', async ({ page }) => {
    const input = page.locator('input[placeholder="建商名聲 or 建案全名"]');
    await expect(input).toHaveValue('順天建設');
  });

  test('輸入建商名稱後顯示判定結果', async ({ page }) => {
    const input = page.locator('input[placeholder="建商名聲 or 建案全名"]');
    await input.fill('測試建設');

    const answerText = page.locator('.answer-text');
    await expect(answerText).toBeVisible();
  });

  test('答案區域顯示「是」或「否」', async ({ page }) => {
    const answerText = page.locator('.answer-text');
    const text = await answerText.textContent();
    expect(['是', '否']).toContain(text?.trim());
  });
});
