'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 地址解析
  router.get('/common/geocoder', controller.common.geocoder);

  // 地址解析
  router.get('/common/login', controller.common.login);

  // 上传文件
  router.post('/common/upload', controller.common.upload);

  // 科室
  router.resources('department', '/department', controller.department);

  // 医院
  router.resources('hospital', '/hospital', controller.hospital);
  router.get('/hosp_list', controller.hospital.hosp_list);

  // 用户
  router.resources('users', '/users', controller.users);
  router.post('/users/set_userinfo', controller.users.set_userinfo);
  router.post('/users/get_userinfo', controller.users.get_userinfo);

};
