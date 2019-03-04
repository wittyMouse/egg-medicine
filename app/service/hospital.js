'use strict';

const Service = require('egg').Service;

class HospitalService extends Service {
  async create(params) {
    const result = await this.app.mysql.insert('hospital', { ...params });
    if (result.affectedRows === 1) {
      return {
        hospital_id: params.hospital_id,
        msg: '添加成功'
      };
    }
  }

  async destroy(id) {
    const result = await this.app.mysql.delete('hospital', { hospital_id: id });
    if (result.affectedRows === 1) {
      return {
        hospital_id: id,
        msg: '删除成功'
      };
    }
  }

  async hosp_list(params) {
    const { tag, keyword, address, p, page_size } = params;
    let sql = 'SELECT * FROM hospital';
    let array = [];
    if (tag) {
      sql += ' WHERE hospital_name like ?';
      array.push('%' + keyword + '%');
    } else {
      if (address) {
        sql += ' WHERE address like ?';
        array.push('%' + address + '%');
      }
      if (p && page_size) {
        sql += ' LIMIT ?,?';
        array = array.concat([(p - 1) * page_size, p * page_size]);
      }
    }
    const result = await this.app.mysql.query(sql, array);
    return result;
  }

  async show(id) {
    const result = await this.app.mysql.get('department', { department_id: id });
    return result;
  }
}

module.exports = HospitalService;