'use strict';

const Service = require('egg').Service;

class DepartmentService extends Service {
  async create(params) {
    const result = await this.app.mysql.insert('department', { ...params });
    if (result.affectedRows === 1) {
      return {
        department_id: params.department_id,
        msg: '添加成功'
      };
    }
  }
  async show(id) {
    const result = await this.app.mysql.get('department', { department_id: id });
    return result;
  }
  async destroy(id) {
    const result = await this.app.mysql.delete('department', { department_id: id });
    if (result.affectedRows === 1) {
      return {
        department_id: id,
        msg: '删除成功'
      };
    }
  }
}

module.exports = DepartmentService;