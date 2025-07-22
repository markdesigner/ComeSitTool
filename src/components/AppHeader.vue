<template>
  <div class="appHeader">
    <div class="container">
      <!-- 桌面版選單 -->
      <div class="headerItems desktop-menu">
        <div
          class="headerItem"
          :class="{ active: checkActive(headerItem) }"
          v-for="(headerItem, headerIndex) in headerList"
          :key="headerIndex"
        >
          <div
            class="item"
            @click="handleClickHeaderItem(headerItem, headerIndex)"
          >
            {{ headerItem.text }}
          </div>
        </div>
      </div>

      <!-- 移動端漢堡選單 -->
      <div class="mobile-menu">
        <div
          class="hamburger"
          @click="toggleMobileMenu"
          :class="{ active: isMobileMenuOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="mobile-menu-items" :class="{ active: isMobileMenuOpen }">
          <div
            class="mobile-headerItem"
            :class="{ active: checkActive(headerItem) }"
            v-for="(headerItem, headerIndex) in headerList"
            :key="headerIndex"
            @click="handleMobileClick(headerItem, headerIndex)"
          >
            {{ headerItem.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    headerList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      routeActiveIndex: 0,
      isMobileMenuOpen: false,
    };
  },
  methods: {
    handleClickHeaderItem(headerItem, headerIndex) {
      console.log(headerItem.routeName, "headerItem");
      if (headerItem.routeName) {
        this.$router.push({ name: headerItem.routeName });
        this.routeActiveIndex = headerIndex;
      }
    },
    handleMobileClick(headerItem, headerIndex) {
      this.handleClickHeaderItem(headerItem, headerIndex);
      this.isMobileMenuOpen = false;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    checkActive(item) {
      return item.routeName === this.$route.name;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
  },
  mounted() {
    // 點擊外部關閉移動端選單
    document.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeMobileMenu);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.appHeader {
  margin-bottom: 20px;
  background-color: #ffffff;
  border-bottom: solid 1px #f1f1f1;
  position: sticky;
  top: 0;
  z-index: 1000;

  .container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    @include mobile {
      height: 50px;
    }
  }

  // 桌面版選單
  .desktop-menu {
    display: flex;
    align-items: center;

    @include mobile {
      display: none;
    }

    .headerItem {
      flex-basis: auto;
      cursor: pointer;
      transition: color 0.3s ease;

      &.active {
        color: #1d80ff;
        font-weight: 600;
      }

      &:hover {
        color: #1d80ff;
      }

      .item {
        margin: 0 20px;
        padding: 10px 0;
        font-size: 16px;

        @include tablet {
          margin: 0 15px;
          font-size: 15px;
        }
      }
    }
  }

  // 移動端選單
  .mobile-menu {
    display: none;

    @include mobile {
      display: block;
      width: 100%;
    }

    .hamburger {
      width: 30px;
      height: 25px;
      position: relative;
      cursor: pointer;
      z-index: 1001;

      span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        background: #333;
        border-radius: 3px;
        transition: all 0.3s ease;

        &:nth-child(1) {
          top: 0px;
        }

        &:nth-child(2) {
          top: 11px;
        }

        &:nth-child(3) {
          top: 22px;
        }
      }

      &.active {
        span {
          &:nth-child(1) {
            transform: rotate(45deg);
            top: 11px;
          }

          &:nth-child(2) {
            opacity: 0;
          }

          &:nth-child(3) {
            transform: rotate(-45deg);
            top: 11px;
          }
        }
      }
    }

    .mobile-menu-items {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #ffffff;
      border-bottom: solid 1px #f1f1f1;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;

      &.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .mobile-headerItem {
        padding: 15px 20px;
        border-bottom: solid 1px #f5f5f5;
        cursor: pointer;
        transition: background-color 0.3s ease;
        text-align: left;

        &:last-child {
          border-bottom: none;
        }

        &.active {
          background-color: #f0f8ff;
          color: #1d80ff;
          font-weight: 600;
        }

        &:hover {
          background-color: #f8f9fa;
        }
      }
    }
  }
}
</style>
