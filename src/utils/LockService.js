import axios from 'axios';

export default class LockService {
  constructor() {
    this.timeMap = null;
    this.clientId = 'fcef9796165d409da004baabedd00bef';
    this.accessToken = 'b57cc0d9fa0dab87c1e028a05be1a9c5';
    this.lockId = '2986231';
    this.pwdType = 3;
    this.pwdName = '';
  }

  setTimeMap(timeMap) {
    this.timeMap = timeMap;
  }

  setName(name) {
    this.pwdName = name;
  }

  async getPwd() {
    if(!this.timeMap) {
      return;
    }
    return await axios.get('https://cnapi.ttlock.com/v3/keyboardPwd/get', {
      params: {
        clientId: this.clientId,
        accessToken: this.accessToken,
        lockId: this.lockId,
        keyboardPwdType: this.pwdType,
        keyboardPwdName: this.pwdName,
        startDate: this.timeMap.start,
        endDate: this.timeMap.end,
        date: new Date().getTime()
      }
    }).then(res => {
      console.log(res,'res')
      return res.data.keyboardPwd;
    })
  }
  
}