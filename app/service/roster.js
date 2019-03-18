'use strict';

const Service = require('egg').Service;
const utils = require('../lib/utils');

class RosterService extends Service {
  async create(params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.insert('roster', data);
    if (result.affectedRows === 1) {
      return { msg: '添加成功', status: 0 };
    } else {
      return { msg: '添加失败', status: 1 }
    }
  }

  async show(id) {
    let result = await this.app.mysql.get('roster', { roster_id: id });
    if (undefined != result) {
      result = utils.objectUSTC(result);
      return { data: result, status: 0 };
    } else {
      return { msg: '暂无数据', status: 1 };
    }
  }

  async update(id, params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.update('roster', data, { where: { roster_id: id } });
    if (result.affectedRows === 1) {
      return { msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 }
    }
  }

  async destroy(id) {
    const result = await this.app.mysql.delete('roster', { roster_id: id });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 }
    }
  }

  async rosterList(params) {
    let data = utils.objectCTUS(params);    
    const { begin_time, end_time, department_id, p, page_size } = data;
    let sql = "SELECT roster_id, department_id, begin_time, end_time, is_default, create_time FROM roster";
    let array = [];

    if (department_id) {
      sql = " WHERE department_id = ?";
      array.push(department_id);
    }

    if (begin_time && end_time) {
      sql = " AND begin_time < ? AND end_time > ? ";
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

  async rosterDelete(params) {
    const { ids } = params;
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      await conn.delete('roster_doctor', { roster_id: ids.split(',') });
      await conn.delete('roster', { roster_id: ids.split(',') });
      return { affectedRows: 1 };
    }, this.ctx);
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 }
    }
  }
}

module.exports = RosterService;