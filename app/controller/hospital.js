'use strict';

const Controller = require('egg').Controller;

const hospitalRule = {
  hospital_id: 'string',
  hospital_name: 'string',
  address: 'string',
  longitude: { type: 'string', required: false },
  latitude: { type: 'string', required: false },
  contacts: 'string',
  introduction: { type: 'string', required: false }
};

class HospitalController extends Controller {
  async create() {
    const ctx = this.ctx;
    ctx.validate(hospitalRule, ctx.request.body);
    const result = await ctx.service.hospital.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.hospital.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async hosp_list() {
    const ctx = this.ctx;
    const result = await ctx.service.hospital.hosp_list(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = HospitalController;
