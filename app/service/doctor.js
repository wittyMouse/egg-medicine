'use strict';

const Service = require('egg').Service;
const utils = require("../lib/utils");

class DoctorService extends Service {
  async create(params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.insert('doctor', { ...data });
    if (result.affectedRows === 1) {
      return { msg: '添加成功', status: 0 };
    } else {
      return { msg: '添加失败', status: 1 }
    }
  }

  async show(id) {
    let result = await this.app.mysql.get('doctor', { doctor_id: id });
    if (undefined != result) {
      result = utils.objectUSTC(result);
      return { data: result, status: 0 };
    } else {
      return { msg: '暂无数据', status: 1 };
    }
  }

  async update(id, params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.update('doctor', data, { where: { doctor_id: id } });
    if (result.affectedRows === 1) {
      return { msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 }
    }
  }

  async destroy(id) {
    const result = await this.app.mysql.delete('doctor', { doctor_id: id });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 }
    }
  }

  async doctorList(params) {
    const data = utils.objectCTUS(params);
    const { department_id, keyword, p, page_size } = data;
    let sql = 'SELECT doctor_id, hospital_id, department_id, doctor_name, doctor_avatar, introduction, create_time FROM doctor';
    let array = [];

    if (department_id) {
      sql += ' WHERE department_id = ?';
      array.push(department_id);
    }

    if (keyword) {
      sql += ' WHERE doctor_name LIKE ?';
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

  async doctorDelete(params) {
    const { ids } = params;
    const result = await this.app.mysql.delete('doctor', { doctor_id: ids.split(',') });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 };
    }
  }
}

module.exports = DoctorService;