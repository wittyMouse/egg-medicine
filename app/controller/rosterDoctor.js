"use strict";

const Controller = require("egg").Controller;

class RosterDoctorController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.rosterDoctor.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.rosterDoctor.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.rosterDoctor.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.rosterDoctor.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async getTicket() {
    const ctx = this.ctx;
    const result = await ctx.service.rosterDoctor.getTicket(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async rosterDoctorList() {
    const ctx = this.ctx;
    const result = await ctx.service.rosterDoctor.rosterDoctorList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async rosterDoctorDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.rosterDoctor.rosterDoctorDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = RosterDoctorController;
