<template>
  <div class="home">
    <img class="copy__icon" alt="Vue logo" src="@/assets/clipboard.svg" />
    <div class="copy__container">
      <div class="copy__form copy__item">
        <input
          type="text"
          class="copy__text copy__text--tip"
          v-model="copyForm.tip"
          placeholder="給個標題"
        />
        <textarea
          class="copy__text copy__text--value"
          type="text"
          v-model="copyForm.value"
          placeholder="要複製的文字"
        />
        <div class="button__group">
          <button @click="addItem">確認</button>
        </div>
      </div>
      <draggable v-model="copyList" v-bind="dragOptions">
        <div class="copy__item" v-for="item in copyList" :key="item.timestamp">
          <input
            type="text"
            class="copy__text copy__text--tip"
            v-model="item.tip"
            placeholder="給個標題"
          />
          <textarea
            class="copy__text copy__text--value"
            type="text"
            v-model="item.value"
            placeholder="要複製的文字"
          ></textarea>
          <div class="button__group">
            <button
              v-clipboard:copy="item.value"
              v-clipboard:success="copySuccess"
              v-clipboard:error="copyError"
            >
              複製
            </button>
            <button @click="handleDelete(index)">刪除此列</button>
            <button class="handle">
              <img class="icon" src="@/assets/icon/menu.svg" />
            </button>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "Home",
  data() {
    return {
      copyList: [],
      copyForm: {
        value: "",
        tip: "",
      },
    };
  },
  watch: {
    copyList: {
      handler() {
        this.handleSave();
      },
      deep: true,
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 10,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    handleAdd() {
      this.copyList.push({ value: "", tip: "" });
    },
    copySuccess() {},
    copyError() {
      alert("copy Error");
    },
    handleSave() {
      const stringifyData = JSON.stringify(this.copyList);
      localStorage.setItem("copyList", stringifyData);
    },
    handleRestore() {
      const rawData = localStorage.getItem("copyList");
      if (rawData) {
        try {
          const copyList = JSON.parse(rawData);
          this.copyList = copyList;
        } catch {
          localStorage.removeItem("copyList");
        }
      }
    },
    handleDelete(index) {
      this.copyList.splice(index, 1);
    },
    addItem() {
      let { value, tip } = this.copyForm;
      const saveItem = {
        tip,
        value,
        timestamp: Date.parse(new Date()),
      };
      this.copyList.unshift(saveItem);
      this.copyForm = {
        value: "",
        tip: "",
      };
    },
  },
  mounted() {
    this.handleRestore();
    // 讓視窗關閉時跳警告視窗
    // window.onbeforeunload = () => {
    //   return true;
    // };
  },
  components: {
    draggable,
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap");

button {
  border: none;
  width: 80px;
  height: 40px;
  border-radius: 12px;
  margin: 4px;
  cursor: pointer;
  background-color: #beedde;
  font-size: 14px;
  transition: all 0.3s ease;

  @include mobile {
    width: 70px;
    height: 45px;
    font-size: 13px;
    margin: 3px;
    min-height: 44px; // 觸控友好的最小高度
  }

  &:active {
    background-color: #5c8e7e;
    transform: scale(0.95);
  }

  &:hover {
    background-color: #a8e0d0;
  }
}

.copy {
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    @include mobile {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }

    @include tablet {
      flex-wrap: wrap;
      gap: 10px;
    }

    .button__group {
      flex-basis: 20%;
      text-align: left;

      @include mobile {
        flex-basis: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        gap: 5px;
        flex-wrap: wrap;
      }

      @include tablet {
        flex-basis: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
        gap: 10px;
      }
    }
  }

  &__icon {
    width: 10%;

    @include mobile {
      width: 15%;
      max-width: 60px;
    }

    @include tablet {
      width: 8%;
    }
  }

  &__container {
    margin: 10px auto 0px;
    width: 80%;

    @include mobile {
      width: 95%;
      margin: 5px auto 0px;
    }

    @include tablet {
      width: 90%;
    }
  }

  &__form {
    .copy__text {
      background-color: #ffdda4;
    }
  }

  &__text {
    margin-right: 10px;
    border-radius: 12px;
    border: none;
    background-color: rgb(190, 237, 222);
    outline: none;
    font-size: 18px;
    color: #000;
    padding: 10px;
    height: 50px;
    transition: all 0.3s ease;

    @include mobile {
      font-size: 16px;
      padding: 12px;
      height: 45px;
      margin-right: 0;
      margin-bottom: 5px;
    }

    @include tablet {
      font-size: 17px;
    }

    &--tip {
      flex-basis: 10%;

      @include mobile {
        flex-basis: 100%;
      }

      @include tablet {
        flex-basis: 15%;
      }
    }

    &--value {
      flex-basis: 70%;

      @include mobile {
        flex-basis: 100%;
        min-height: 80px;
        resize: vertical;
      }

      @include tablet {
        flex-basis: 60%;
      }
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(30, 128, 255, 0.2);
    }
  }

  &__handleContainer {
    margin-top: 30px;
  }
}

.drag {
  &__item {
    background-color: #ffdda4;
    margin-bottom: 20px;
  }
}

.icon {
  width: 20%;

  @include mobile {
    width: 25%;
  }
}

.ghost {
  opacity: 0.5;
  background: #d2e5df;
}

.flip-list-move {
  transition: transform 0.5s;
}

// 移動端優化
@media (max-width: 768px) {
  .copy__item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .copy__text {
    border: 1px solid #e0e0e0;

    &:focus {
      border-color: #1d80ff;
    }
  }

  button {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:active {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }
  }
}

// 平板優化
@media (min-width: 769px) and (max-width: 1024px) {
  .copy__item {
    background: #fafafa;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
  }
}
</style>
