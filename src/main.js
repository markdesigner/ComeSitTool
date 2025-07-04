import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueClipboard from "vue-clipboard2";
// import Calendar from 'v-calendar/lib/components/calendar.umd'
// import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import VCalendar from 'v-calendar';
Vue.config.productionTip = false;
Vue.use(VueClipboard);
Vue.use(VCalendar);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
