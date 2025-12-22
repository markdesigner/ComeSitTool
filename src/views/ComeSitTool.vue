<template>
  <div class="CopyTool">
    <div class="booking-container">
      <div class="people">
        人數：<input
          type="number"
          v-model="peopleNumberV2"
          placeholder="人數"
        />
      </div>
      <textarea class="copyArea" v-model="bookingTextV2"></textarea>
      <div class="CopyTool__ProduceButton">
        <button @click="handleGenerateAndCopyBookingV2">一鍵生成與複製</button>
      </div>
    </div>
    <div class="container">
      <div class="input__item textInput">
        <div class="textInput__item">
          <input
            class="CopyTool__input CopyTool__input--guestName"
            v-model="guestName"
            type="text"
            placeholder="人名"
          />
        </div>
        <div class="textInput__item">
          <input
            class="CopyTool__input CopyTool__input--lockPassword"
            v-model="lockPassword"
            type="text"
            placeholder="電子鎖密碼"
          />
        </div>
        <div class="periodSelect-container">
          <select v-model="period">
            <option value="whole">整天場選擇</option>
            <option value="morning">上午場</option>
            <option value="evening">下午場</option>
          </select>
        </div>
      </div>
      <div class="input__item">
        <v-date-picker v-model="bookingDate" />
      </div>
      <div class="input__item">
        <v-date-picker
          v-model="bookingTime"
          mode="time"
          isRange
          is24hr
          :validHours="validHoursRange"
          :minute-increment="60"
        />
      </div>
      <!-- <span
        >{{ guestName }} {{ bookingStartTime }}
        {{ bookingEndTime }} {{ lockPassword }}</span
      > -->
    </div>
    <textarea class="CopyTool__textBlock" v-model="dialogue"></textarea>
    <div class="CopyTool__ProduceButton">
      <button @click="generatePwd">產生密碼</button>
    </div>
    <div class="CopyTool__ProduceButton">
      <button @click="handleGenerateAndCopy">一鍵生成與複製</button>
    </div>
  </div>
</template>

<script>
import dayJs from "dayjs";
import "dayjs/locale/zh-tw";
import LockService from "@/utils/LockService";
import { DatePicker } from "v-calendar";
import { BOOKING_TEXT, BOOKING_TEXT_V2 } from "@/constants/messages";

export default {
  name: "CopyTool",
  components: {
    VDatePicker: DatePicker,
  },
  data() {
    return {
      guestName: "",
      bookingStartTime: "",
      bookingEndTime: "",
      bookingDate: new Date(),
      bookingTime: {
        start: dayJs(new Date()).format("YYYY-MM-DDT12:00:00"),
        end: dayJs(new Date()).format("YYYY-MM-DDT21:00:00"),
      },
      lockPassword: "",
      dialogue: "",
      isCustomizeTime: false,
      period: "whole",
      days: [],
      peopleNumber: 5,
      peopleNumberV2: 5,
      bookingText: "",
      bookingTextV2: "",
      lockService: null,
    };
  },
  created() {
    dayJs.locale("zh-tw");
    this.checkLockService();

    global.vuecp = this;
  },
  watch: {
    bookingDate(bookingDate) {
      this.bookingTime = {
        start: dayJs(bookingDate).format("YYYY-MM-DDT12:00:00"),
        end: dayJs(bookingDate).format("YYYY-MM-DDT21:00:00"),
      };
    },
  },
  methods: {
    onDayClick(day) {
      console.log("onDayClick", day);
    },
    setBookingTime() {
      if (this.period === "whole") {
        if (
          dayJs(this.bookingDate).format("d") === "6" ||
          this.bookingDay === "0"
        ) {
          this.bookingTime.start = dayJs(
            dayJs(this.bookingDate).format("YYYY-MM-DDT12:00:00")
          ).toDate();
          this.bookingTime.end = dayJs(
            dayJs(this.bookingDate).format("YYYY-MM-DDT21:00:00")
          ).toDate();
          console.log("設定中");
        } else {
          this.bookingStartTime = "09:00";
          this.bookingEndTime = "21:00";
        }
      } else if (this.period === "morning") {
        this.bookingStartTime = "09:00";
        this.bookingEndTime = "14:00";
      } else {
        this.bookingStartTime = "15:00";
        this.bookingEndTime = "21:00";
      }
    },
    async handleGenerateAndCopy() {
      await this.generatePwd();
      this.handleProduceText();
      this.copy();
    },
    handleGenerateAndCopyBooking() {
      this.handleBookingText();
      this.copyBookingText();
    },
    handleGenerateAndCopyBookingV2() {
      this.handleBookingTextV2();
      this.copyBookingTextV2();
    },
    handleBookingText() {
      this.bookingText = BOOKING_TEXT({ amount: this.peopleNumber * 250 });
    },
    handleBookingTextV2() {
      this.bookingTextV2 = BOOKING_TEXT_V2({
        amount: this.peopleNumberV2 * 250,
      });
    },
    async copyBookingText() {
      await this.$copyText(this.bookingText).catch(() => {
        throw new Error("copy error");
      });
    },
    async copyBookingTextV2() {
      await this.$copyText(this.bookingTextV2).catch(() => {
        throw new Error("copy error");
      });
    },
    async copy() {
      await this.$copyText(this.dialogue).catch(() => {
        throw new Error("copy error");
      });
    },
    handleProduceText() {
      let textResult = `🪑感謝預約，這邊先給您入場資訊與密碼呦~

我們：${this.arrangeBookingDate} 有來坐預約，採自助式入場

🪑入場教學：

  到時紅色大門有個密碼鎖，保護客人使用空間不會有外人入場。

  前來時您的密碼為「${this.lockPassword}#」要記得加#唷！

  密碼時效為 ${this.arrangeStartTime} - ${this.arrangeEndTime}，中途都可自行進出

🪑我們的WiFi：

  名稱：comesit
  密碼：comesitspace

🪑這邊也提供設備的使用教學

📌投影機使用教學：https://youtu.be/s1NzaJ8Ewsg

📌手機用音響播放音樂教學: https://youtu.be/CiyMo7gzvLQ

📌飛鏢機使用教學：https://youtu.be/qDS5eHW8qmE

📌投影機沒有聲音如何解決： https://youtu.be/o93hvL1qZ2o

🪑入場須知：

冷氣和燈光都可以自行開關，最後離場時再幫我們都關掉就好。冰箱也可以使用（但冰箱裡的東西沒有提供😊）。

入場後樓下有來坐專屬鞋櫃，再幫我們直接穿鞋走樓梯下樓即可呦～

另外為保持場地品質，來坐一律不能吸菸、喝酒、開伙和砸派呦。

樓下的門在使用時請幫我們關上～

使用過的餐具也幫我們集中到白色餐車上。若有廚餘請集中到同一容器，並放在桌上即可。

🪑離場叮嚀：

檢查隨身物品，以及充電線或是冰箱內的物品是否都有帶到～

並幫我們確認冷氣和燈都有關閉。樓下的門開著就可以囉～

🪑停車資訊：

  騎機車的朋友們可以直接停來坐招牌前方與正門口，並請勿鎖龍頭。

  開車的朋友可停附近貴和停車場(無特約)、和周邊停車格呦!
  (https://goo.gl/maps/N3zEHZVsP1JsHGNQ7)

🪑若到現場有任何狀況或問題，都歡迎隨時在這告知我們，我們會立馬回覆處理唷！
祝您有個愉快的一天❤️
`;
      this.dialogue = textResult;
    },
    handleCopyError() {
      alert("複製失敗");
    },
    async generatePwd() {
      const BOOKING_FORWARD_TIME = 60 * 60 * 1000;
      const BOOKING_BACKWARD_TIME = 60 * 60 * 1000;
      this.lockService.setName(this.guestName);
      this.lockService.setTimeMap({
        start:
          new Date(this.bookingTime.start).getTime() - BOOKING_FORWARD_TIME,
        end: new Date(this.bookingTime.end).getTime() + BOOKING_BACKWARD_TIME,
      });
      const pwd = await this.lockService.getPwd();
      this.lockPassword = pwd;
    },
    checkLockService() {
      if (!this.lockService) {
        this.lockService = new LockService();
      }
    },
  },
  computed: {
    arrangeBookingDate() {
      return dayJs(this.bookingDate).format("YYYY/MM/DD dddd");
    },
    arrangeStartTime() {
      return dayJs(this.bookingTime.start).format("HH:mm");
    },
    arrangeEndTime() {
      return dayJs(this.bookingTime.end).format("HH:mm");
    },
    validHoursRange() {
      return {
        min: 8,
        max: 23,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.CopyTool {
  width: 90vw;
  height: 100vh;
  margin: 0 auto;

  @include mobile {
    width: 95vw;
    height: auto;
    min-height: 100vh;
    padding: 10px;
  }

  @include tablet {
    width: 92vw;
  }

  .booking-container {
    margin: 50px;

    @include mobile {
      margin: 20px 10px;
    }

    @include tablet {
      margin: 30px 20px;
    }

    .people {
      margin-bottom: 15px;
      font-size: 16px;

      @include mobile {
        font-size: 14px;
        margin-bottom: 10px;
      }

      input {
        margin-left: 10px;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;

        @include mobile {
          width: 80px;
          padding: 10px;
          font-size: 16px; // 防止iOS縮放
        }
      }
    }

    .copyArea {
      margin: 20px 0;
      width: 600px;
      height: 150px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      resize: vertical;

      @include mobile {
        width: 100%;
        height: 120px;
        margin: 15px 0;
        padding: 12px;
        font-size: 16px; // 防止iOS縮放
      }

      @include tablet {
        width: 100%;
        max-width: 500px;
      }
    }
  }

  .container {
    display: flex;
    justify-content: center;

    @include mobile {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    @include tablet {
      flex-wrap: wrap;
      gap: 20px;
    }

    .input__item {
      margin: 0 10px;

      @include mobile {
        margin: 0;
        width: 100%;
        max-width: 350px;
      }

      @include tablet {
        margin: 0 5px;
        flex: 1;
        min-width: 200px;
      }

      &.textInput {
        @include mobile {
          order: 1;
        }

        .textInput__item {
          margin-bottom: 15px;

          @include mobile {
            margin-bottom: 12px;
          }

          input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;

            @include mobile {
              padding: 15px;
              font-size: 16px; // 防止iOS縮放
            }

            &:focus {
              outline: none;
              border-color: #1d80ff;
              box-shadow: 0 0 0 2px rgba(30, 128, 255, 0.2);
            }
          }
        }

        .periodSelect-container {
          select {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            background-color: white;

            @include mobile {
              padding: 15px;
              font-size: 16px; // 防止iOS縮放
            }

            &:focus {
              outline: none;
              border-color: #1d80ff;
              box-shadow: 0 0 0 2px rgba(30, 128, 255, 0.2);
            }
          }
        }
      }
    }
  }

  &__textBlock {
    width: 100%;
    height: 400px;
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    resize: vertical;

    @include mobile {
      height: 300px;
      margin: 15px 0;
      padding: 12px;
      font-size: 16px; // 防止iOS縮放
    }

    &:focus {
      outline: none;
      border-color: #1d80ff;
      box-shadow: 0 0 0 2px rgba(30, 128, 255, 0.2);
    }
  }

  &__ProduceButton {
    text-align: center;
    margin: 20px 0;

    @include mobile {
      margin: 15px 0;
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

      @include mobile {
        width: 100%;
        max-width: 300px;
        padding: 15px 20px;
        font-size: 16px;
        min-height: 48px; // 觸控友好的最小高度
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

// v-calendar 響應式優化
:deep(.vc-container) {
  @include mobile {
    font-size: 14px;

    .vc-header {
      padding: 10px;
    }

    .vc-weeks {
      padding: 0 5px;
    }

    .vc-day {
      min-height: 35px;
      font-size: 13px;
    }
  }
}

// 移動端優化
@media (max-width: 768px) {
  .CopyTool {
    .container {
      .input__item {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }

    .booking-container {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
}

// 平板優化
@media (min-width: 769px) and (max-width: 1024px) {
  .CopyTool {
    .container {
      .input__item {
        background: #fafafa;
        padding: 20px;
        border-radius: 8px;
      }
    }

    .booking-container {
      background: #fafafa;
      padding: 25px;
      border-radius: 8px;
    }
  }
}
</style>
