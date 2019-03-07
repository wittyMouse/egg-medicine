"use strict";

const Controller = require("egg").Controller;

const usersRule = {
  open_id: "string"
};

class UsersController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = "hello world!";
  }

  async new() {}

  async create() {
    const ctx = this.ctx;
    ctx.validate(usersRule, ctx.request.body);
    const result = await ctx.service.users.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.users.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async edit() {}

  async update() {
    const ctx = this.ctx;
    // ctx.validate(usersRule, ctx.request.body);
    const result = await ctx.service.users.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.users.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }
  
  async set_userinfo() {
    const ctx = this.ctx;
    const result = await ctx.service.users.set_userinfo(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async get_userinfo() {
    const ctx = this.ctx;
    const result = await ctx.service.users.get_userinfo(ctx.request.body.token);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = UsersController;
