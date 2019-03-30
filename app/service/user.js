'use strict';

const Service = require('egg').Service;
const WXBizDataCrypt = require('../lib/WXBizDataCrypt');
const utils = require('../lib/utils');

class UserService extends Service {
  async create(params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.insert('user', { ...data });
    if (result.affectedRows === 1) {
      return { msg: '添加成功', status: 0 };
    } else {
      return { msg: '添加失败', status: 1 }
    }
  }

  async show(id) {
    let result = await this.app.mysql.get('user', { open_id: id });
    if (undefined != result) {
      result = utils.objectUSTC(result);
      return { data: result, status: 0 };
    } else {
      return { msg: '暂无数据', status: 1 };
    }
  }

  async update(id, params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.update('user', data, { where: { open_id: id } });
    if (result.affectedRows === 1) {
      return { msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 }
    }
  }

  async destroy(id) {
    const result = await this.app.mysql.delete('user', { open_id: id });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 }
    }
  }

  async userList(params) {
    const { keyword, p, page_size } = params;
    let sql = 'SELECT open_id, nick_name, gender, language, city, province, country, avatar_url, phone_number, pure_phone_number, country_code, balance, is_admin, create_time FROM user';
    let array = [];

    if (keyword) {
      sql += ' WHERE nick_name LIKE ?';
      array.push('%' + keyword + '%');
    }
    if (p && page_size) {
      sql += ' LIMIT ?,?';
      array = array.concat([(p - 1) * page_size, p * page_size]);
    }

    const result = await this.app.mysql.query(sql, array);
    let temp = [];
    result.map(value => {
      temp.push(utils.objectUSTC(value));
    });
    return { data: temp, status: 0 };
  }

  async userDelete(params) {
    const { ids } = params;
    const result = await this.app.mysql.delete('user', { open_id: ids.split(',') });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 };
    }
  }

  async setUserinfo(params) {
    let row = await this.app.mysql.get('wx_token', { token: params.token });
    if (undefined != row) {
      let res = await this.show(row.open_id);
      if (res.status == 1) {
        let data = new WXBizDataCrypt(this.config.appId, row.session_key).decryptData(params.encryptedData, params.iv);
        if (data.watermark.appid == this.config.appId) {
          data = {
            open_id: row.open_id,
            nick_name: data.nickName,
            gender: data.gender,
            language: data.language,
            city: data.city,
            province: data.province,
            country: data.country,
            avatar_url: data.avatarUrl
          }
          return this.create(data);
        } else {
          return { msg: '解密错误，添加失败', status: 1 };
        }
      } else {
        return { msg: '该用户已存在', status: 1 };
      }
    } else {
      return { msg: 'token有误', status: 1 };
    }
  }

  async getUserinfo(token) {
    let res = await this.app.mysql.get('wx_token', { token });
    if (undefined != res) {
      let result = await this.show(res.open_id);
      return result;
    } else {
      return { msg: 'token有误，或暂无信息', status: 1 };
    }
  }

  async updateUserinfo(params) {
    let data = utils.objectCTUS(params);
    let sql = `UPDATE user SET ${data.key} = ? WHERE open_id = (SELECT open_id FROM wx_token WHERE token = ?)`;
    let array = [data.value, data.token];
    if (data.key == 'balance') {
      sql = `UPDATE user SET balance = balance ${data.tag && data.tag == 'add' ? '+' : '-'} ? WHERE open_id = (SELECT open_id FROM wx_token WHERE token = ?)`;
    }
    const result = await this.app.mysql.query(sql, array);
    if (result.affectedRows === 1) {
      return { msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 }
    }
  }

  async checkBalance(token) {
    let sql = "SELECT a.balance FROM user AS a JOIN wx_token AS b ON a.open_id = b.open_id WHERE token = ?"
    let result = await this.app.mysql.query(sql, token);
    if (result.length > 0) {
      result = utils.objectUSTC(result[0]);
      return { data: result, status: 0 };
    } else {
      return { msg: '暂无数据', status: 1 };
    }
  }
}

module.exports = UserService;