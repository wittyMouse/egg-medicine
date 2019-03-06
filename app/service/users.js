'use strict';

const Service = require('egg').Service;

class UsersService extends Service {
  async create(params) {
    const result = await this.app.mysql.insert('users', { ...params });
    if (result.affectedRows === 1) {
      return {
        msg: '添加成功'
      };
    }
  }
  async show(id) {
    const result = await this.app.mysql.get('users', { open_id: id });
    return result;
  }
  async destroy(id) {
    const result = await this.app.mysql.delete('users', { open_id: id });
    if (result.affectedRows === 1) {
      return {
        department_id: id,
        msg: '删除成功'
      };
    }
  }
}

module.exports = UsersService;