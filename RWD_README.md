# RWD (響應式網頁設計) 實現說明

## 概述

本專案已全面實現響應式網頁設計 (RWD)，支援各種設備尺寸，包括手機、平板和桌面設備。

## 斷點設定

```scss
$breakpoint-xs: 480px;   // 超小螢幕
$breakpoint-sm: 768px;   // 小螢幕 (手機)
$breakpoint-md: 1024px;  // 中等螢幕 (平板)
$breakpoint-lg: 1200px;  // 大螢幕
$breakpoint-xl: 1400px;  // 超大螢幕
```

## 主要功能

### 1. 響應式導航欄
- **桌面版**: 水平選單
- **移動端**: 漢堡選單，支援點擊展開/收起
- **平板版**: 自適應選單項目間距

### 2. 響應式頁面佈局
- **Home頁面**: 複製工具，移動端垂直佈局
- **ComeSitTool頁面**: 預訂工具，表單響應式優化
- **HouseTool頁面**: 建商查詢工具，卡片式設計
- **TestPage頁面**: 測試工具，工具卡片佈局

### 3. 響應式表格組件
- **桌面版**: 傳統表格佈局
- **移動端**: 卡片式佈局，每行數據顯示為卡片

## 使用方法

### 1. 引入RWD工具類

```scss
@import "@/assets/styles/rwd.scss";
```

### 2. 使用RWD Mixins

```scss
.my-component {
  // 桌面版樣式
  width: 100%;
  
  // 平板版樣式
  @include tablet {
    width: 90%;
  }
  
  // 移動端樣式
  @include mobile {
    width: 95%;
  }
}
```

### 3. 使用RWD工具類

```html
<!-- 響應式網格 -->
<div class="responsive-grid">
  <div class="responsive-card">內容1</div>
  <div class="responsive-card">內容2</div>
</div>

<!-- 響應式隱藏/顯示 -->
<div class="hidden-mobile">桌面版顯示</div>
<div class="visible-mobile">移動端顯示</div>

<!-- 觸控友好的按鈕 -->
<button class="touch-friendly">按鈕</button>
```

## 主要改進

### 1. 移動端優化
- 觸控友好的按鈕尺寸 (最小44px)
- 防止iOS縮放的字體大小 (16px)
- 垂直佈局適應小螢幕
- 漢堡選單導航

### 2. 平板端優化
- 自適應網格佈局
- 適中的間距和字體大小
- 混合佈局設計

### 3. 桌面端優化
- 水平佈局充分利用螢幕空間
- 懸停效果和互動
- 最佳閱讀體驗

## 組件響應式特性

### AppHeader
- 桌面版: 水平選單
- 移動端: 漢堡選單 + 下拉選單
- 支援點擊外部關閉選單

### Home頁面
- 桌面版: 水平表單佈局
- 移動端: 垂直表單佈局
- 觸控友好的按鈕和輸入框

### ComeSitTool頁面
- 桌面版: 並排表單佈局
- 移動端: 堆疊表單佈局
- 響應式日期選擇器

### HouseTool頁面
- 響應式搜尋框
- 自適應結果顯示
- 動畫效果優化

### TestPage頁面
- 工具卡片佈局
- 響應式輸入框
- 觸控友好的按鈕

### AppTable組件
- 桌面版: 傳統表格
- 移動端: 卡片式佈局
- 支援自定義內容

## 性能優化

1. **CSS優化**: 使用SCSS變數和Mixins減少重複代碼
2. **圖片優化**: 響應式圖片載入
3. **觸控優化**: 防止意外觸控和縮放
4. **動畫優化**: 使用CSS3動畫提升性能

## 瀏覽器支援

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- iOS Safari
- Android Chrome

## 測試建議

1. **設備測試**: 在不同設備上測試實際效果
2. **瀏覽器測試**: 在主要瀏覽器中測試
3. **方向測試**: 測試橫向和縱向模式
4. **觸控測試**: 在觸控設備上測試互動效果

## 未來改進

1. 添加更多斷點支援
2. 實現深色模式
3. 添加更多動畫效果
4. 優化載入性能
5. 添加無障礙功能支援 