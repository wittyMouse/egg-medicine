"use strict";

const Controller = require("egg").Controller;

class UsersController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async userList() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.userList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async userDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.patient.userDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
  
  async setUserinfo() {
    const ctx = this.ctx;
    const result = await ctx.service.users.setUserinfo(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async getUserinfo() {
    const ctx = this.ctx;
    const result = await ctx.service.users.getUserinfo(ctx.request.body.token);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = UsersController;
