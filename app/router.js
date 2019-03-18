'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 地址解析
  router.get('/common/geocoder', controller.common.geocoder);

  // 登录
  router.post('/common/login', controller.common.login);

  // 上传文件
  router.post('/common/upload', controller.common.upload);

  // 删除文件
  router.post('/common/delete_file', controller.common.deleteFile);

  // 医院
  router.resources('hospital', '/hospital', controller.hospital);
  router.get('/hosp_list', controller.hospital.hospList);
  router.post('/hosp_delete', controller.hospital.hospDelete);

  // 科室
  router.resources('department', '/department', controller.department);
  router.get('/dept_list', controller.department.deptList);
  router.post('/dept_delete', controller.department.deptDelete);

  // 医生
  router.resources('doctor', '/doctor', controller.doctor);
  router.get('/doctor_list', controller.doctor.doctorList);
  router.post('/doctor_delete', controller.doctor.doctorDelete);

  // 用户
  router.resources('user', '/user', controller.user);
  router.get('/user_list', controller.user.userList);
  router.post('/user_delete', controller.user.userDelete);
  router.post('/user/set_userinfo', controller.user.setUserinfo);
  router.post('/user/get_userinfo', controller.user.getUserinfo);

  // 就诊人
  router.resources('patient', '/patient', controller.patient);
  router.get('/patient_list', controller.patient.patientList);
  router.post('/patient_delete', controller.patient.patientDelete);

  // 挂号信息
  router.resources('register', '/register', controller.register);
  router.get('/register_list', controller.register.registerList);
  router.get('/register_detail/:id', controller.register.registerDetail);
  router.post('/register_delete', controller.register.registerDelete);

  // 排班
  router.resources('roster', '/roster', controller.roster);
  router.get('/roster_list', controller.roster.rosterList);
  router.post('/roster_delete', controller.roster.rosterDelete);

  // 排班医生
  router.resources('roster_doctor', '/roster_doctor', controller.roster_doctor);
  router.get('/roster_doctor_list', controller.roster_doctor.rosterDoctorList);
  router.post('/roster_doctor_delete', controller.roster_doctor.rosterDoctorDelete);
};
