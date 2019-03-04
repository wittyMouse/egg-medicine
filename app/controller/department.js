'use strict';

const Controller = require('egg').Controller;

const departmentRule = {
    department_id: 'string',
    parent_id: 'string',
    department_name: 'string',
    introduction: 'string'
};

class DepartmentController extends Controller {
    async index() {
        const ctx = this.ctx;
        ctx.body = 'hello world!';
    }
    async new() {

    }
    async create() {
        const ctx = this.ctx;
        ctx.validate(departmentRule, ctx.request.body);
        const result = await ctx.service.department.create(ctx.request.body);
        ctx.body = result;
        ctx.status = 200;
    }
    async show() {
        const ctx = this.ctx;
        const result = await ctx.service.department.show(ctx.params.id);
        ctx.body = result;
        ctx.status = 200;
    }
    async edit() {

    }
    async update() {

    }
    async destroy() {
        const ctx = this.ctx;
        const result = await ctx.service.department.destroy(ctx.params.id);
        ctx.body = result;
        ctx.status = 200;
    }
}

module.exports = DepartmentController;
