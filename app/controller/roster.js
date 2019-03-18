"use strict";

const Controller = require("egg").Controller;

class RosterController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.roster.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.roster.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.roster.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.roster.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async rosterList() {
    const ctx = this.ctx;
    const result = await ctx.service.roster.rosterList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async rosterDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.roster.rosterDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = RosterController;
