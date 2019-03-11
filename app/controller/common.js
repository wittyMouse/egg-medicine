'use strict';

const Controller = require('egg').Controller;

const geocoderRule = {
  tag: 'string'
};

const loginRule = {
  code: 'string'
};

class CommonController extends Controller {
  async geocoder() {
    const { ctx } = this;
    ctx.validate(geocoderRule, ctx.request.query);
    const result = await ctx.service.common.geocoder(ctx.request.query);
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

  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const result = await ctx.service.common.upload(stream);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = CommonController;
