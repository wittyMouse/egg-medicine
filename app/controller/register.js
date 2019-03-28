"use strict";

const Controller = require("egg").Controller;

class RegisterController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.register.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.register.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.register.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.register.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async registerList() {
    const ctx = this.ctx;
    const result = await ctx.service.register.registerList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async registerRecord() {
    const ctx = this.ctx;
    const result = await ctx.service.register.registerRecord(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async registerDetail() {
    const ctx = this.ctx;
    const result = await ctx.service.register.registerDetail(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async registerDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.register.registerDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = RegisterController;
