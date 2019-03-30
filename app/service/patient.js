'use strict';

const Service = require('egg').Service;
const utils = require("../lib/utils");

class PatientService extends Service {
  async create(params) {
    let data = utils.objectCTUS(params);
    let sql = "INSERT INTO patient SET open_id = (SELECT open_id FROM wx_token WHERE token = ?), patient_name = ?, gender = ?, id_card = ?, phone_number = ?, address = ?";
    let array = [data['token'], data['patient_name'], data['gender'], data['id_card'], data['phone_number'], data['address']];
    if (data['is_default']) {
      sql += ", is_default = ?";
      array.push(data['is_default']);
    }
    const result = await this.app.mysql.query(sql, array);
    if (result.affectedRows === 1) {
      return { msg: '添加成功', status: 0 };
    } else {
      return { msg: '添加失败', status: 1 }
    }
  }

  async show(id) {
    let result = await this.app.mysql.get('patient', { patient_id: id });
    if (undefined != result) {
      result = utils.objectUSTC(result);
      return { data: result, status: 0 };
    } else {
      return { msg: '暂无数据', status: 1 };
    }
  }

  async update(id, params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.update('patient', data, { where: { patient_id: id } });
    if (result.affectedRows === 1) {
      return { msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 }
    }
  }

  async destroy(id) {
    const result = await this.app.mysql.delete('patient', { patient_id: id });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 }
    }
  }

  async patientList(params) {
    let data = utils.objectCTUS(params);
    const { token, is_default, keyword, p, page_size } = data;
    let sql = 'SELECT b.patient_id, b.open_id, b.patient_name, b.gender, b.id_card, b.phone_number, b.address, b.is_default FROM wx_token AS a JOIN patient AS b ON a.open_id = b.open_id WHERE token = ?';
    let array = [token];

    if (is_default) {
      if (sql.search(/WHERE/) > -1) {
        sql += ' AND';
      } else {
        sql += ' WHERE';
      }
      sql += ' is_default = ?';
      array.push(is_default);
    }

    if (keyword) {
      if (sql.search(/WHERE/) > -1) {
        sql += ' AND';
      } else {
        sql += ' WHERE';
      }
      sql += ' hospital_name LIKE ?';
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

  async patientDelete(params) {
    const { ids } = params;
    const result = await this.app.mysql.delete('patient', { patient_id: ids.split(',') });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 };
    }
  }
}

module.exports = PatientService;