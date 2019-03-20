"use strict";

const Controller = require("egg").Controller;

class PayLogController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.payLog.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.payLog.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.payLog.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.payLog.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async payLogList() {
    const ctx = this.ctx;
    const result = await ctx.service.payLog.payLogList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async payLogDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.payLog.payLogDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = PayLogController;
