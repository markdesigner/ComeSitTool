<template>
  <div class="TestPage">
    <div class="tool">
      <h1 class="title">打卡記錄</h1>
      <div class="onboard-time" v-if="enterOfficeDate">
        {{ convertRenderDate(enterOfficeDate) }}
        {{ convertRenderTimeToSeconds(enterOfficeDate) }}
      </div>
      <button @click="onBoard">打卡</button>
    </div>
    <div class="tool">
      <h1 class="title">Rem換算</h1>
      <input type="text" v-model="rem" @input="handleInputChange" />
      <div class="answer">{{ rem * 16 }}</div>
    </div>

    <div class="tool">
      <h1 class="title">CoCo換算</h1>
      <input type="number" step="0.1" v-model="monthSalary" />
      <div class="answer">{{ monthSalary * 17.5 }} 萬</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestPage",
  components: {},
  data() {
    return {
      rem: 1,
      monthSalary: 7.2,
      enterOfficeDate: null,
    };
  },
  methods: {
    handleInputChange() {
      this.rem = this.rem.replace(/[^0-9.]/g, "");
    },
    handleOfficeDateChange() {
      localStorage.setItem("onBoardTime", this.enterOfficeDate.getTime());
    },
    onBoard() {
      this.enterOfficeDate = new Date();
      this.handleOfficeDateChange();
    },
    convertRenderDate(date) {
      return `${date.getFullYear()}-${`00${date.getMonth() + 1}`.substr(
        -2
      )}-${`00${date.getDate()}`.substr(-2)}`;
    },
    convertRenderTimeToSeconds(date) {
      return `${`00${date.getHours()}`.substr(
        -2
      )}:${`00${date.getMinutes()}`.substr(
        -2
      )}:${`00${date.getSeconds()}`.substr(-2)}`;
    },
  },
  created() {
    const onBoardTime = localStorage.getItem("onBoardTime");
    console.log(onBoardTime, "onBoardTime");
    if (onBoardTime) {
      this.enterOfficeDate = new Date(Number(onBoardTime));
      console.log(this.enterOfficeDate);
    }
  },
};
</script>

<style lang="scss" scoped>
.TestPage {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  @include mobile {
    padding: 15px;
  }
}

.tool {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @include mobile {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    padding: 15px;
    margin-bottom: 20px;
  }

  @include tablet {
    gap: 15px;
    padding: 18px;
  }

  .title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin: 0;
    min-width: 120px;

    @include mobile {
      font-size: 18px;
      text-align: center;
      min-width: auto;
    }

    @include tablet {
      font-size: 19px;
      min-width: 100px;
    }
  }

  .onboard-time {
    font-size: 16px;
    color: #666;
    font-family: monospace;

    @include mobile {
      font-size: 14px;
      text-align: center;
    }
  }

  input {
    font-size: 20px;
    width: 150px;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    outline: none;
    transition: all 0.3s ease;

    @include mobile {
      width: 100%;
      font-size: 16px; // 防止iOS縮放
      padding: 12px 15px;
      text-align: center;
    }

    @include tablet {
      width: 120px;
      font-size: 18px;
    }

    &:focus {
      border-color: #1d80ff;
      box-shadow: 0 0 0 2px rgba(30, 128, 255, 0.2);
    }
  }

  .answer {
    font-size: 30px;
    font-weight: 600;
    color: #1d80ff;
    min-width: 100px;

    @include mobile {
      font-size: 24px;
      text-align: center;
      min-width: auto;
    }

    @include tablet {
      font-size: 26px;
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
    min-width: 100px;

    @include mobile {
      width: 100%;
      padding: 15px 20px;
      font-size: 16px;
      min-height: 48px; // 觸控友好的最小高度
    }

    @include tablet {
      padding: 12px 20px;
      font-size: 15px;
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

// 移動端優化
@media (max-width: 768px) {
  .tool {
    background: #ffffff;
    border: 1px solid #e0e0e0;

    input {
      background: #f8f9fa;

      &:focus {
        background: white;
      }
    }
  }
}

// 平板優化
@media (min-width: 769px) and (max-width: 1024px) {
  .tool {
    background: #fafafa;
  }
}
</style>
