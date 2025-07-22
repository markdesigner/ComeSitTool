<template>
  <div class="rwd-test">
    <h1 class="page-title">RWD 測試頁面</h1>

    <!-- 響應式網格展示 -->
    <section class="test-section">
      <h2>響應式網格佈局</h2>
      <div class="responsive-grid">
        <div class="responsive-card">
          <h3>卡片 1</h3>
          <p>這是一個響應式卡片，在不同螢幕尺寸下會自動調整佈局。</p>
        </div>
        <div class="responsive-card">
          <h3>卡片 2</h3>
          <p>移動端會顯示為單列，平板顯示為雙列，桌面顯示為多列。</p>
        </div>
        <div class="responsive-card">
          <h3>卡片 3</h3>
          <p>使用CSS Grid實現的自適應佈局，無需JavaScript。</p>
        </div>
      </div>
    </section>

    <!-- 響應式隱藏/顯示展示 -->
    <section class="test-section">
      <h2>響應式隱藏/顯示</h2>
      <div class="hidden-mobile">
        <p>這段文字只在桌面和平板顯示，手機上會隱藏。</p>
      </div>
      <div class="visible-mobile">
        <p>這段文字只在手機上顯示，桌面和平板上會隱藏。</p>
      </div>
      <div class="hidden-tablet">
        <p>這段文字在平板上隱藏，手機和桌面顯示。</p>
      </div>
    </section>

    <!-- 響應式表單展示 -->
    <section class="test-section">
      <h2>響應式表單</h2>
      <form class="responsive-form">
        <div class="form-group">
          <label>姓名：</label>
          <input type="text" placeholder="請輸入姓名" class="touch-friendly" />
        </div>
        <div class="form-group">
          <label>電子郵件：</label>
          <input
            type="email"
            placeholder="請輸入電子郵件"
            class="touch-friendly"
          />
        </div>
        <div class="form-group">
          <label>訊息：</label>
          <textarea
            placeholder="請輸入訊息"
            rows="4"
            class="touch-friendly"
          ></textarea>
        </div>
        <button type="submit" class="touch-friendly">送出</button>
      </form>
    </section>

    <!-- 響應式表格展示 -->
    <section class="test-section">
      <h2>響應式表格</h2>
      <AppTable :headData="tableHeaders">
        <template #thead>
          <tr>
            <th v-for="(header, index) in tableHeaders" :key="index">
              {{ header }}
            </th>
          </tr>
        </template>
        <template #tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.phone }}</td>
            <td>{{ row.status }}</td>
          </tr>
        </template>
        <template #mobile-cards>
          <div
            class="mobile-card"
            v-for="(row, index) in tableData"
            :key="index"
          >
            <div class="card-row">
              <span class="card-label">姓名：</span>
              <span class="card-value">{{ row.name }}</span>
            </div>
            <div class="card-row">
              <span class="card-label">電子郵件：</span>
              <span class="card-value">{{ row.email }}</span>
            </div>
            <div class="card-row">
              <span class="card-label">電話：</span>
              <span class="card-value">{{ row.phone }}</span>
            </div>
            <div class="card-row">
              <span class="card-label">狀態：</span>
              <span class="card-value">{{ row.status }}</span>
            </div>
          </div>
        </template>
      </AppTable>
    </section>

    <!-- 響應式圖片展示 -->
    <section class="test-section">
      <h2>響應式圖片</h2>
      <div class="image-container">
        <img
          src="https://via.placeholder.com/800x400/1d80ff/ffffff?text=響應式圖片"
          alt="響應式圖片"
          class="responsive-img"
        />
      </div>
    </section>

    <!-- 響應式視頻展示 -->
    <section class="test-section">
      <h2>響應式視頻</h2>
      <div class="responsive-video">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </section>

    <!-- 設備資訊顯示 -->
    <section class="test-section">
      <h2>當前設備資訊</h2>
      <div class="device-info">
        <p><strong>螢幕寬度：</strong> {{ screenWidth }}px</p>
        <p><strong>螢幕高度：</strong> {{ screenHeight }}px</p>
        <p><strong>設備類型：</strong> {{ deviceType }}</p>
        <p><strong>方向：</strong> {{ orientation }}</p>
        <p><strong>觸控支援：</strong> {{ touchSupport }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import AppTable from "@/components/AppTable";

export default {
  name: "RWDTest",
  components: {
    AppTable,
  },
  data() {
    return {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      orientation: window.innerWidth > window.innerHeight ? "橫向" : "縱向",
      touchSupport: "ontouchstart" in window ? "是" : "否",
      tableHeaders: ["姓名", "電子郵件", "電話", "狀態"],
      tableData: [
        {
          name: "張三",
          email: "zhang@example.com",
          phone: "0912-345-678",
          status: "活躍",
        },
        {
          name: "李四",
          email: "li@example.com",
          phone: "0923-456-789",
          status: "離線",
        },
        {
          name: "王五",
          email: "wang@example.com",
          phone: "0934-567-890",
          status: "活躍",
        },
        {
          name: "趙六",
          email: "zhao@example.com",
          phone: "0945-678-901",
          status: "忙碌",
        },
      ],
    };
  },
  computed: {
    deviceType() {
      if (this.screenWidth < 768) return "手機";
      if (this.screenWidth < 1024) return "平板";
      return "桌面";
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("orientationchange", this.handleOrientationChange);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener(
      "orientationchange",
      this.handleOrientationChange
    );
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.orientation =
        window.innerWidth > window.innerHeight ? "橫向" : "縱向";
    },
    handleOrientationChange() {
      setTimeout(() => {
        this.handleResize();
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.rwd-test {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @include mobile {
    padding: 15px;
  }

  .page-title {
    text-align: center;
    color: #333;
    margin-bottom: 30px;

    @include mobile {
      font-size: 24px;
      margin-bottom: 20px;
    }

    @include tablet {
      font-size: 28px;
    }

    @include desktop {
      font-size: 32px;
    }
  }

  .test-section {
    margin-bottom: 40px;

    @include mobile {
      margin-bottom: 30px;
    }

    h2 {
      color: #1d80ff;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0f0f0;

      @include mobile {
        font-size: 20px;
        margin-bottom: 15px;
      }
    }
  }

  .device-info {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #1d80ff;

    @include mobile {
      padding: 15px;
    }

    p {
      margin: 8px 0;
      font-size: 14px;

      @include mobile {
        font-size: 13px;
      }

      strong {
        color: #1d80ff;
      }
    }
  }

  .image-container {
    text-align: center;
    margin: 20px 0;
  }

  .responsive-form {
    max-width: 600px;
    margin: 0 auto;

    .form-group {
      margin-bottom: 20px;

      @include mobile {
        margin-bottom: 15px;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;

        @include mobile {
          font-size: 14px;
        }
      }

      input,
      textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 16px;
        transition: all 0.3s ease;

        @include mobile {
          padding: 15px;
        }

        &:focus {
          outline: none;
          border-color: #1d80ff;
          box-shadow: 0 0 0 2px rgba(30, 128, 255, 0.2);
        }
      }

      textarea {
        resize: vertical;
        min-height: 100px;
      }
    }

    button {
      background-color: #1d80ff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;

      @include mobile {
        padding: 15px 20px;
        min-height: 48px;
      }

      &:hover {
        background-color: #1670e6;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(29, 128, 255, 0.3);
      }

      &:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(29, 128, 255, 0.3);
      }
    }
  }
}

// 移動端優化
@media (max-width: 768px) {
  .rwd-test {
    .test-section {
      background: #ffffff;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
}

// 平板優化
@media (min-width: 769px) and (max-width: 1024px) {
  .rwd-test {
    .test-section {
      background: #fafafa;
      padding: 20px;
      border-radius: 8px;
    }
  }
}
</style>
