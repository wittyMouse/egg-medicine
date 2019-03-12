'use strict';

const Service = require('egg').Service;
const utils = require("../lib/utils");

class HospitalService extends Service {
  async create(params) {
    let data = utils.objectCTUS(params);
    if (undefined != await this.app.mysql.get('hospital', { hospital_name: data.hospital_name })) {
      return { msg: '该医院已存在', status: 1 };
    }
    if (!(data.latitude && data.longitude)) {
      let res = await this.ctx.service.common.geocoder({ address: data.address, tag: 'forward' });
      if (res.status == 0) {
        data.latitude = res.result.location.lat;
        data.longitude = res.result.location.lng;  
      } else {
        return { msg: '地址解析失败', status: 1 };
      }
    }
    const result = await this.app.mysql.insert('hospital', { ...data });
    if (result.affectedRows === 1) {
      return { msg: '添加成功', status: 0 };
    } else {
      return { msg: '添加失败', status: 1 }
    }
  }
  
  async show(id) {
    const result = await this.app.mysql.get('hospital', { hospital_id: id });
    return { data: result, status: 0 };
  }

  async update(id, params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.update('hospital', data, { where: { hospital_id: id } });
    if (result.affectedRows === 1) {
      return { msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 }
    }
  }

  async destroy(id) {
    const result = await this.app.mysql.delete('hospital', { hospital_id: id });
    if (result.affectedRows === 1) {
      return { hospital_id: id, msg: '删除成功', status: 0 };
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
    return { data: result, status: 0 };
  }
}

module.exports = HospitalService;