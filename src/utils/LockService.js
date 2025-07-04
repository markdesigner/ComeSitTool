import axios from "axios";

export default class LockService {
  constructor() {
    this.timeMap = null;
    this.clientId = process.env.VUE_APP_TTLOCK_CLIENT_ID;
    this.accessToken = "";
    this.lockId = process.env.VUE_APP_TTLOCK_LOCK_ID;
    this.pwdType = 3;
    this.pwdName = "";
    this.getAuth();
  }

  setTimeMap(timeMap) {
    this.timeMap = timeMap;
  }

  setName(name) {
    this.pwdName = name;
  }

  async getAuth() {
    return await axios
      .post(
        "https://cnapi.ttlock.com/oauth2/token",
        {
          clientId: this.clientId,
          clientSecret: process.env.VUE_APP_TTLOCK_CLIENT_SECRET,
          username: process.env.VUE_APP_TTLOCK_USERNAME,
          password: process.env.VUE_APP_TTLOCK_PASSWORD,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        this.accessToken = res.data.access_token;
      });
  }

  async getPwd() {
    if (!this.timeMap) {
      return;
    }
    return await axios
      .get("https://cnapi.ttlock.com/v3/keyboardPwd/get", {
        params: {
          clientId: this.clientId,
          accessToken: this.accessToken,
          lockId: this.lockId,
          keyboardPwdType: this.pwdType,
          keyboardPwdName: this.pwdName,
          startDate: this.timeMap.start,
          endDate: this.timeMap.end,
          date: new Date().getTime(),
        },
      })
      .then((res) => {
        return res.data.keyboardPwd;
      });
  }
}
