import { test, expect } from '@playwright/test';

test.describe('頁面導航', () => {
  test('首頁預設載入 ComeSitTool 頁面', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('.CopyTool')).toBeVisible();
  });

  test('透過 Header 導航到 Home 頁面', async ({ page }) => {
    await page.goto('./');
    await page.locator('.desktop-menu .item', { hasText: 'Home' }).click();
    await expect(page).toHaveURL(/\/Home/);
    await expect(page.locator('.home')).toBeVisible();
  });

  test('透過 Header 導航到 HouseTool 頁面', async ({ page }) => {
    await page.goto('./');
    await page.locator('.desktop-menu .item', { hasText: 'HouseTool' }).click();
    await expect(page).toHaveURL(/\/HouseTool/);
    await expect(page.locator('.HouseTool')).toBeVisible();
  });

  test('透過 Header 導航到 TestPage 頁面', async ({ page }) => {
    await page.goto('./');
    await page.locator('.desktop-menu .item', { hasText: 'TestPage' }).click();
    await expect(page).toHaveURL(/\/TestPage/);
  });

  test('Header 被點擊的項目顯示 active 狀態', async ({ page }) => {
    await page.goto('./');
    const activeItem = page.locator('.desktop-menu .headerItem.active');
    await expect(activeItem).toContainText('ComeSitTool');
  });
});
