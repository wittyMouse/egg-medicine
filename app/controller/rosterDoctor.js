"use strict";

const Controller = require("egg").Controller;

class RosterDoctorController extends Controller {
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.roster_doctor.create(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.service.roster_doctor.show(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.roster_doctor.update(ctx.params.id, ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.roster_doctor.destroy(ctx.params.id);
    ctx.body = result;
    ctx.status = 200;
  }

  async rosterDoctorList() {
    const ctx = this.ctx;
    const result = await ctx.service.roster_doctor.rosterDoctorList(ctx.request.query);
    ctx.body = result;
    ctx.status = 200;
  }

  async rosterDoctorDelete() {
    const ctx = this.ctx;
    const result = await ctx.service.roster_doctor.rosterDoctorDelete(ctx.request.body);
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = RosterDoctorController;
