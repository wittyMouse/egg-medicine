'use strict';

const Controller = require('egg').Controller;

const geocoderRule = {
  address: 'string'
};

class CommonController extends Controller {
  async geocoder() {
    const { ctx } = this;
    ctx.validate(geocoderRule, ctx.request.query);
    const result = await ctx.service.common.geocoder(ctx.request.query.address);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = CommonController;
