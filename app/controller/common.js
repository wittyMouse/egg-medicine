'use strict';

const Controller = require('egg').Controller;

const geocoderRule = {
  address: 'string'
};

const loginRule = {
  code: 'string'
};

class CommonController extends Controller {
  async geocoder() {
    const { ctx } = this;
    ctx.validate(geocoderRule, ctx.request.query);
    const result = await ctx.service.common.geocoder(ctx.request.query.address);
    ctx.body = result;
    ctx.status = 200;
  }
  
  async login() {
    const { ctx } = this;
    ctx.validate(loginRule, ctx.request.query);
    const result = await ctx.service.common.login(ctx.request.query.code);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = CommonController;
