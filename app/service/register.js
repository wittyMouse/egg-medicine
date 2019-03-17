'use strict';

const Service = require('egg').Service;
const utils = require('../lib/utils');

class RegisterService extends Service {
  async create(params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.insert('registered_record', { ...data });
    if (result.affectedRows === 1) {
      return { msg: '添加成功', status: 0 };
    } else {
      return { msg: '添加失败', status: 1 }
    }
  }

  async show(id) {
    let result = await this.app.mysql.get('registered_record', { record_id: id });
    if (undefined != result) {
      result = utils.objectUSTC(result);
      return { data: result, status: 0 };
    } else {
      return { msg: '暂无数据', status: 1 };
    }
  }

  async update(id, params) {
    let data = utils.objectCTUS(params);
    const result = await this.app.mysql.update('registered_record', data, { where: { record_id: id } });
    if (result.affectedRows === 1) {
      return { msg: '更新成功', status: 0 };
    } else {
      return { msg: '更新失败', status: 1 }
    }
  }

  async destroy(id) {
    const result = await this.app.mysql.delete('registered_record', { record_id: id });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 }
    }
  }

  async registerList(params) {
    const { token, keyword, p, page_size } = params;
    let sql = "SELECT a.record_id AS register_recordId, a.patient_id AS register_patientId, a.doctor_id AS register_doctorId, a.visit_time AS register_visitTime, a.type AS register_type, a.registration_fees AS register_registrationFees, a.create_time AS register_createTime, b.patient_id AS patient_patientId, b.open_id AS patient_openId, b.patient_name AS patient_patientName, b.gender AS patient_gender, b.id_card AS patient_idCard, b.phone_number AS patient_phoneNumber, b.address AS patient_address, b.is_default AS patient_isDefault, b.create_time AS patient_createTime, c.doctor_id AS doctor_doctorId, c.hospital_id AS doctor_hospitalId, c.department_id AS doctor_departmentId, c.doctor_name AS doctor_doctorName, c.doctor_avatar AS doctor_doctorAvatar, c.introduction AS doctor_introduction, c.create_time AS doctor_createTime, d.hospital_id AS hospital_hospitalId, d.hospital_name AS hospital_hospitalName, d.hospital_logo AS hospital_hospitalLogo, d.address AS hospital_address, d.longitude AS hospital_longitude, d.latitude AS hospital_latitude, d.contacts AS hospital_contacts, d.introduction AS hospital_introduction, d.create_time AS hospital_createTime, e.department_id AS department_departmentId, e.hospital_id AS department_hospitalId, e.parent_id AS department_parentId, e.department_name AS department_departmentName, e.introduction AS department_introduction, e.create_time AS department_createTime FROM ((((registered_record AS a LEFT JOIN patient AS b ON a.patient_id = b.patient_id) LEFT JOIN doctor AS c ON a.doctor_id = c.doctor_id) LEFT JOIN hospital AS d ON c.hospital_id = d.hospital_id) LEFT JOIN department AS e ON c.department_id = e.department_id)";
    let array = [];

    if (token) {
      let query = "SELECT c.patient_id FROM ((wx_token AS a LEFT JOIN user AS b ON a.open_id = b.open_id) LEFT JOIN patient AS c ON b.open_id = c.open_id) WHERE a.token = ?";
      let res = await this.app.mysql.query(query, [token]);
      let temp = "";
      res.forEach((item, index) => {
        if (index == 0) {
          temp = item['patient_id'];
        } else {
          temp += ',' + item['patient_id'];
        }
      });
      sql += " WHERE a.patient_id IN (?)";
      array.push(temp);
    }

    if (keyword) {
      let temp = '';
      if (sql.search(/WHERE/) > -1) {
        temp = ' AND';
      } else {
        temp = ' WHERE';
      }
      sql += temp + ' b.patient_name LIKE ? OR c.doctor_name LIKE ?';
      array.push('%' + keyword + '%');
      array.push('%' + keyword + '%');
    }

    if (p && page_size) {
      sql += ' LIMIT ?,?';
      array = array.concat([(p - 1) * page_size, p * page_size]);
    }

    const result = await this.app.mysql.query(sql, array);
    let temp = [];
    result.map(value => {
      temp.push(utils.removePrefix(value));
    });
    return { data: temp, status: 0 };
  }

  async registerDetail(id) {
    let sql = "SELECT a.record_id AS register_recordId, a.patient_id AS register_patientId, a.doctor_id AS register_doctorId, a.visit_time AS register_visitTime, a.type AS register_type, a.registration_fees AS register_registrationFees, a.create_time AS register_createTime, b.patient_id AS patient_patientId, b.open_id AS patient_openId, b.patient_name AS patient_patientName, b.gender AS patient_gender, b.id_card AS patient_idCard, b.phone_number AS patient_phoneNumber, b.address AS patient_address, b.is_default AS patient_isDefault, b.create_time AS patient_createTime, c.doctor_id AS doctor_doctorId, c.hospital_id AS doctor_hospitalId, c.department_id AS doctor_departmentId, c.doctor_name AS doctor_doctorName, c.doctor_avatar AS doctor_doctorAvatar, c.introduction AS doctor_introduction, c.create_time AS doctor_createTime, d.hospital_id AS hospital_hospitalId, d.hospital_name AS hospital_hospitalName, d.hospital_logo AS hospital_hospitalLogo, d.address AS hospital_address, d.longitude AS hospital_longitude, d.latitude AS hospital_latitude, d.contacts AS hospital_contacts, d.introduction AS hospital_introduction, d.create_time AS hospital_createTime, e.department_id AS department_departmentId, e.hospital_id AS department_hospitalId, e.parent_id AS department_parentId, e.department_name AS department_departmentName, e.introduction AS department_introduction, e.create_time AS department_createTime FROM ((((registered_record AS a LEFT JOIN patient AS b ON a.patient_id = b.patient_id) LEFT JOIN doctor AS c ON a.doctor_id = c.doctor_id) LEFT JOIN hospital AS d ON c.hospital_id = d.hospital_id) LEFT JOIN department AS e ON c.department_id = e.department_id)";
    sql += ' WHERE a.patient_id IN (?)';
    const result = await this.app.mysql.query(sql, [id]);
    if (result.length > 0) {
      let temp = utils.removePrefix(result[0]);
      return { data: temp, status: 0 };
    } else {
      return { msg: '暂无数据', status: 1 };
    }
  }

  async registerDelete(params) {
    const { ids } = params;
    const result = await this.app.mysql.delete('registered_record', { record_id: ids.split(',') });
    if (result.affectedRows === 1) {
      return { msg: '删除成功', status: 0 };
    } else {
      return { msg: '删除失败', status: 1 };
    }
  }
}

module.exports = RegisterService;