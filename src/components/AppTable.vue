<template>
  <div class="AppTable">
    <!-- 桌面版表格 -->
    <table class="desktop-table">
      <thead>
        <slot name="thead" :number="headData.length" :items="headData">
          <tr>
            <th v-for="(headItem, index) in headData" :key="index">
              {{ headItem }}
            </th>
          </tr>
        </slot>
      </thead>
      <tbody>
        <slot name="tbody"></slot>
      </tbody>
    </table>

    <!-- 移動端卡片式佈局 -->
    <div class="mobile-cards">
      <slot name="mobile-cards"></slot>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "AppTable",
  props: {
    headData: {
      type: Array,
      required: false,
      default: () => 9,
    },
  },
  methods: {
    generateUUID() {
      return uuidv4();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.AppTable {
  width: 100%;
  overflow-x: auto;

  // 桌面版表格
  .desktop-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @include mobile {
      display: none;
    }

    thead {
      background-color: #f8f9fa;

      tr {
        border-bottom: solid 1px #eee;

        th {
          padding: 15px 12px;
          text-align: left;
          font-weight: 600;
          color: #333;
          font-size: 14px;

          @include tablet {
            padding: 12px 8px;
            font-size: 13px;
          }
        }
      }
    }

    tbody {
      tr {
        border-bottom: solid 1px #f0f0f0;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #f8f9fa;
        }

        &:last-child {
          border-bottom: none;
        }

        td {
          padding: 12px;
          font-size: 14px;
          color: #333;

          @include tablet {
            padding: 10px 8px;
            font-size: 13px;
          }
        }
      }
    }
  }

  // 移動端卡片式佈局
  .mobile-cards {
    display: none;

    @include mobile {
      display: block;
    }

    .mobile-card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .card-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }

        .card-label {
          font-weight: 600;
          color: #666;
          font-size: 14px;
          min-width: 80px;
        }

        .card-value {
          color: #333;
          font-size: 14px;
          text-align: right;
          flex: 1;
          margin-left: 10px;
        }
      }
    }
  }
}

// 表格響應式滾動
@media (max-width: 1024px) {
  .AppTable {
    .desktop-table {
      min-width: 600px; // 確保表格內容不會被壓縮
    }
  }
}

// 平板優化
@media (min-width: 769px) and (max-width: 1024px) {
  .AppTable {
    .desktop-table {
      font-size: 13px;

      th,
      td {
        padding: 8px 6px;
      }
    }
  }
}
</style>
