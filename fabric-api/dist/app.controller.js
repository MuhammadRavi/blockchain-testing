"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const request_do_dto_1 = require("./dto/request-do.dto");
const update_status_do_dto_1 = require("./dto/update-status-do.dto");
const update_do_dto_1 = require("./dto/update-do.dto");
const get_do_org_dto_1 = require("./dto/get-do-org.dto");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    requestDo(payload) {
        return this.appService.requestDo(payload.data);
    }
    queryAllDo() {
        return this.appService.getAllDo();
    }
    queryAllDoCo(payload) {
        return this.appService.getAllDoCo(payload.orgName);
    }
    queryAllDoSl(payload) {
        return this.appService.getAllDoSl(payload.orgName);
    }
    queryStatusDo(orderId) {
        return this.appService.getStatusDo(orderId);
    }
    queryDoByOrderId(orderId) {
        return this.appService.getDoByOrderId(orderId);
    }
    queryDoRelease() {
        return this.appService.getDoRelease();
    }
    updateStatusDoCo(orderId, payload) {
        return this.appService.updateStatusDoCo(orderId, payload);
    }
    updateStatusDoSl(orderId, payload) {
        return this.appService.updateStatusDoSl(orderId, payload);
    }
    updateDoCo(orderId, payload) {
        return this.appService.updateDoCo(orderId, payload.data);
    }
    updateDoSl(orderId, payload) {
        return this.appService.updateDoSl(orderId, payload.data);
    }
    decisionDo(orderId, status) {
        if (!["Released", "Rejected"].includes(status)) {
            throw new common_1.BadRequestException(`Status for Decision DO must have been Released or Rejected`);
        }
        if (status === "Released") {
            return this.appService.releaseDo(orderId);
        }
        else {
            return this.appService.rejectDo(orderId);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, swagger_1.ApiTags)("invoke"),
    (0, common_1.Post)('invoke/do'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_do_dto_1.RequestDoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "requestDo", null);
__decorate([
    (0, swagger_1.ApiTags)("query"),
    (0, common_1.Get)('query/do'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "queryAllDo", null);
__decorate([
    (0, swagger_1.ApiTags)("query"),
    (0, common_1.Get)('query/do/co'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_do_org_dto_1.GetDoOrgDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "queryAllDoCo", null);
__decorate([
    (0, swagger_1.ApiTags)("query"),
    (0, common_1.Get)('query/do/sl'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_do_org_dto_1.GetDoOrgDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "queryAllDoSl", null);
__decorate([
    (0, swagger_1.ApiTags)("query"),
    (0, common_1.Get)('query/status-do/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "queryStatusDo", null);
__decorate([
    (0, swagger_1.ApiTags)("query"),
    (0, common_1.Get)('query/do/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "queryDoByOrderId", null);
__decorate([
    (0, swagger_1.ApiTags)("query"),
    (0, common_1.Get)('query/do/release'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "queryDoRelease", null);
__decorate([
    (0, swagger_1.ApiTags)("invoke"),
    (0, common_1.Put)('invoke/status-do/co/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_do_dto_1.UpdateStatusDoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateStatusDoCo", null);
__decorate([
    (0, swagger_1.ApiTags)("invoke"),
    (0, common_1.Put)('invoke/status-do/sl/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_do_dto_1.UpdateStatusDoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateStatusDoSl", null);
__decorate([
    (0, swagger_1.ApiTags)("invoke"),
    (0, common_1.Put)('invoke/do/co/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_do_dto_1.UpdateDoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateDoCo", null);
__decorate([
    (0, swagger_1.ApiTags)("invoke"),
    (0, common_1.Put)('invoke/do/sl/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_do_dto_1.UpdateDoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateDoSl", null);
__decorate([
    (0, swagger_1.ApiTags)("invoke"),
    (0, common_1.Put)('invoke/do/decision/:orderId?'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "decisionDo", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('chaincode'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map