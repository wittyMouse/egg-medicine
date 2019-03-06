"use strict";

const Service = require("egg").Service;
const crypto = require("crypto");

class CommonService extends Service {
  async geocoder(address) {
    const result = await this.app.curl(
      "http://api.map.baidu.com/geocoder/v2/",
      {
        data: {
          address,
          output: "json",
          ak: this.config.ak
        }
      }
    );
    if (result.status === 200) {
      return JSON.parse(result.data);
    }
  }

  async login(code) {
    const result = await this.app.curl(
      "https://api.weixin.qq.com/sns/jscode2session",
      {
        data: {
          appid: this.config.appId,
          secret: this.config.appSecret,
          js_code: code,
          grant_type: "authorization_code"
        }
      }
    );
    if (result.status === 200) {
      let data = JSON.parse(result.data);
      if (data.openid) {
        let md5 = crypto.createHash("md5");
        let token = md5.update(data.session_key + this.config.appSecret).digest("hex");
        const res = await this.app.mysql.insert("wx_token", { open_id: data.openid, union_id: data.unionid || "", token, session_key: data.session_key });
        if (res.affectedRows === 1) {
          return {
            token,
            msg: "success"
          };
        }
      } else {
        return {
          ...data,
          msg: "fail"
        }
      }
    }
  }
}

module.exports = CommonService;
