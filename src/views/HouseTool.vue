<template>
  <div class="HouseTool">
    <div class="search-container">
      <input v-model="answer" type="text" placeholder="建商名聲 or 建案全名" />
    </div>
    <div class="answer-container">
      <span class="question-text">寶咖咖嗎？</span>
      <div v-if="isBao" class="answer-text warning">是</div>
      <div v-else class="answer-text">否</div>
    </div>
  </div>
</template>

<script>
import baoList from "@/constants/baoList";

export default {
  name: "HouseTool",
  components: {},
  data() {
    return {
      answer: "順天建設",
    };
  },
  computed: {
    isBao() {
      return this.checkIsBao();
    },
  },
  methods: {
    checkIsBao() {
      let result = false;
      const answerCompanyName = this.answer.substr(0, 2);
      baoList.forEach((company) => {
        if (company.includes(answerCompanyName)) {
          result = true;
        }
      });
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.HouseTool {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  @include mobile {
    padding: 15px;
  }

  .search-container {
    margin-bottom: 30px;
    text-align: center;

    @include mobile {
      margin-bottom: 20px;
    }

    input {
      width: 100%;
      max-width: 400px;
      padding: 15px 20px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      outline: none;
      transition: all 0.3s ease;

      @include mobile {
        padding: 12px 15px;
        font-size: 16px; // 防止iOS縮放
        border-width: 1px;
      }

      &:focus {
        border-color: #1d80ff;
        box-shadow: 0 0 0 3px rgba(30, 128, 255, 0.2);
      }

      &::placeholder {
        color: #999;

        @include mobile {
          font-size: 16px; // 防止iOS縮放
        }
      }
    }
  }

  .answer-container {
    text-align: center;

    .question-text {
      display: block;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #333;

      @include mobile {
        font-size: 20px;
        margin-bottom: 15px;
      }

      @include tablet {
        font-size: 22px;
      }
    }

    .answer-text {
      width: 200px;
      height: 200px;
      font-size: 100px;
      margin: auto;
      color: white;
      line-height: 180px;
      border-radius: 10%;
      background-color: green;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      @include mobile {
        width: 150px;
        height: 150px;
        font-size: 60px;
        line-height: 130px;
        border-radius: 15%;
      }

      @include tablet {
        width: 180px;
        height: 180px;
        font-size: 80px;
        line-height: 160px;
      }

      &.warning {
        background-color: orange;
        animation: pulse 2s infinite;
      }

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      }
    }
  }
}

// 脈衝動畫效果
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

// 移動端優化
@media (max-width: 768px) {
  .HouseTool {
    .search-container {
      input {
        background: #f8f9fa;
        border: 1px solid #e0e0e0;

        &:focus {
          background: white;
        }
      }
    }

    .answer-container {
      .answer-text {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        &:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}

// 平板優化
@media (min-width: 769px) and (max-width: 1024px) {
  .HouseTool {
    .search-container {
      input {
        background: #fafafa;
      }
    }
  }
}
</style>
