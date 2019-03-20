'use strict';

const Service = require('egg').Service;
const utils = require('../lib/utils');

class RosterDoctorService extends Service {
  async create(params) {
    let data = utils.objectCTUS(params);
    let result = "";
    if (data.roster_id) {
      result = await this.app.mysql.insert('roster_doctor', data);
    } else {
      let roster_id = utils.buildId(new Date(data.begin_time));
      let row1 = { roster_id, department_id: data.department_id, begin_time: data.begin_time, end_time: data.end_time, is_default: data.is_default };
      let row2 = { roster_id, doctor_id: data.doctor_id, begin_time: data.begin_time, end_time: data.end_time, duration: data.duration };
      result = await this.app.mysql.beginTransactionScope(async conn => {
        await conn.insert('roster', row1);
        await conn.insert('roster_doctor', row2);
        return { affectedRows: 1 };
      }, this.ctx);
    }
    if (result.affectedRows === 1) {
      return { msg: '添加成功', status: 0 };
    } else {
      return { msg: '添加失败', status: 1 }
    }
  }

  async show(id) {
    let result = await this.app.mysql.get('roster_doctor', { roster_doctor_id: id });
    if (undefined != result) {
      result = utils.objectUSTC(result);
      return { data: result, status: 0 };
    } else {
      return { msg: '暂无数据', status: 1 };
    }
  }

  async update(id, params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.update('roster_doctor', data, { where: { roster_doctor_id: id } });
    if (result.affectedRows === 1) {
      return { msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 }
    }
  }

  async destroy(id) {
    const result = await this.app.mysql.delete('roster_doctor', { roster_doctor_id: id });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 }
    }
  }

  async rosterDoctorList(params) {
    let data = utils.objectCTUS(params);    
    const { begin_time, end_time, doctor_id, roster_id, p, page_size } = data;
    let sql = "SELECT a.roster_doctor_id, a.roster_id, a.doctor_id, a.begin_time, a.end_time, a.duration, a.create_time, b.hospital_id, b.department_id, b.doctor_name, b.doctor_avatar, b.introduction FROM roster_doctor AS a JOIN doctor AS b ON a.doctor_id = b.doctor_id";
    let array = [];

    if (roster_id) {
      sql += " WHERE roster_id = ?";
      array.push(roster_id);
    }

    if (doctor_id) {
      let temp = "";
      if (sql.search(/WHERE/) > -1) {
        temp = ' AND';
      } else {
        temp = ' WHERE';
      }
      sql += temp + " doctor_id = ?";
      array.push(doctor_id);
    }

    if (begin_time && end_time) {
      let temp = "";
      if (sql.search(/WHERE/) > -1) {
        temp = ' AND';
      } else {
        temp = ' WHERE';
      }
      sql += temp + " begin_time > ? OR end_time > ? ";
      array.push(end_time);
      array.push(begin_time);
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

  async rosterDoctorDelete(params) {
    const { ids } = params;
    const result = await this.app.mysql.delete('roster_doctor', { roster_doctor_id: ids.split(',') });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 }
    }
  }
}

module.exports = RosterDoctorService;