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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorTracingService = void 0;
const tsyringe_1 = require("tsyringe");
const error_model_1 = require("../models/error.model");
const erorrTracing_repository_1 = require("../repository/erorrTracing.repository");
let ErrorTracingService = class ErrorTracingService {
    constructor(tracingRepository) {
        this.errorTracing = tracingRepository;
    }
    setErrorTracing(error, tracingId) {
        let type = "";
        if (error.isAxiosError) {
            type = "500 TIMEOUT";
        }
        else {
            type = error;
        }
        let errorTracingModel = new error_model_1.ErrorTracingModel("", type, tracingId, "");
        return this.errorTracing.save(errorTracingModel);
    }
    getTodayErrorTracing() {
        let startDate = new Date(Date.now());
        startDate.setUTCHours(0, 0, 0, 0);
        let endDate = new Date(Date.now());
        endDate.setUTCHours(23, 59, 59, 59);
        return this.errorTracing.getAllFromInterval(startDate, endDate);
    }
    deleteErrorTracing(errorTracing) {
        return this.errorTracing.deleteById(errorTracing.id);
    }
};
ErrorTracingService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [erorrTracing_repository_1.ErrorTracingRepository])
], ErrorTracingService);
exports.ErrorTracingService = ErrorTracingService;
//# sourceMappingURL=errorTracing.service.js.map