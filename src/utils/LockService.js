import axios from "axios";

export default class LockService {
  constructor() {
    this.timeMap = null;
    this.clientId = "fcef9796165d409da004baabedd00bef";
    this.accessToken = "";
    this.lockId = "2986231";
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
    console.log("getAuth");
    return await axios
      .post(
        "https://cnapi.ttlock.com/oauth2/token",
        {
          clientId: this.clientId,
          clientSecret: "6fce8190478d93a4c7e398468f13c698",
          username: "weisheng1202@gmail.com",
          password: "AEB70A88190F288F0D78A2E2180B05D9",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res, "res");
        this.accessToken = res.data.access_token;
        console.log(this.accessToken, "this.accessToken");
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
        console.log(res, "res");
        return res.data.keyboardPwd;
      });
  }
}
