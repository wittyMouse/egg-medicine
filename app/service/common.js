'use strict';

const Service = require('egg').Service;

class CommonService extends Service {
  async geocoder(address) {
    const result = await this.app.curl('http://api.map.baidu.com/geocoder/v2/', {
      data: {
        address,
        output: 'json',
        ak: this.config.ak
      }
    });
    if (result.status === 200) {
      return JSON.parse(result.data);
    }
  }
}

module.exports = CommonService;
