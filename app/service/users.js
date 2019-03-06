'use strict';

const Service = require('egg').Service;

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

  async get_userinfo(token) {
    let row = await this.app.mysql.get('wx_token', { token });
    if (row != undefined) {
      return this.show(row.open_id);
    } else {
      return { msg: 'token有误', status: 1 };
    }
  }
}

module.exports = UsersService;