'use strict';

const Service = require('egg').Service;
const WXBizDataCrypt = require('../lib/WXBizDataCrypt');
const utils = require('../lib/utils');

class UsersService extends Service {
  async create(params) {
    const result = await this.app.mysql.insert('users', { ...params });
    if (result.affectedRows === 1) {
      return { data: { open_id: params.openId }, msg: '添加成功', status: 0 };
    } else {
      return { msg: '添加失败', status: 1 };
    }
  }

  async show(id) {
    const row = await this.app.mysql.get('users', { open_id: id });
    if (row != undefined) {
      return { data: row, status: 0 };
    } else {
      return { msg: '该用户不存在', status: 1 };
    }
  }

  async update(params) {
    const result = await this.app.mysql.update('users', { ...params }, { where: { open_id: params.open_id } });
    if (result.affectedRows === 1) {
      return { data: { open_id: params.open_id }, msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 };
    }
  }
  
  async destroy(id) {
    const result = await this.app.mysql.delete('users', { open_id: id });
    if (result.affectedRows === 1) {
      return { data: { open_id: id }, msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 };
    }
  }

  async set_userinfo(params) {
    let row = await this.app.mysql.get('wx_token', { token: params.token });
    if (row != undefined) {
      let res = await this.show(row.open_id);
      if (res.status == 1) {
        let data = new WXBizDataCrypt(this.config.appId, row.session_key).decryptData(params.encryptedData, params.iv);
        if (data.watermark.appid == this.config.appId) {
          data = {
            open_id: row.open_id,
            union_id: data.unionId,
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

  async get_userinfo(token) {
    let row = await this.app.mysql.get('wx_token', { token });
    if (row != undefined) {
      let result = await this.show(row.open_id);
      if (result.status == 0) {
        result.data = utils.objectUSTC(result.data);
      }
      return result;
    } else {
      return { msg: 'token有误，或没有信息', status: 1 };
    }
  }
}

module.exports = UsersService;