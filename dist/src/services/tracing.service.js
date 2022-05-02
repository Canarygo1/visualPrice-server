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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracingService = void 0;
const tracing_repository_1 = require("../repository/tracing.repository");
const tsyringe_1 = require("tsyringe");
let TracingService = class TracingService {
    constructor(tracingRepository) {
        this.tracingRepository = tracingRepository;
    }
    getTracingListByDistributor() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tracingRepository.getTracingByDistributorName('Alcampo');
        });
    }
    getTracingListByClientCpPostalCode(clientName, distributorName, postalCode) {
        return this.tracingRepository.getTracingByDistributorAndClient(distributorName, clientName, postalCode);
    }
    updateTracing(tracing) {
        return this.tracingRepository.updateTracing(tracing);
    }
    getTracingByErrorTracingModel(tracingList) {
        let tracingIds = [];
        for (let i = 0; i < tracingList.length; i++) {
            tracingIds.push(tracingList[i].tracingId);
        }
        return this.tracingRepository.getTracingByIdList(tracingIds);
    }
    getTracingListByClient(name) {
        return this.tracingRepository.getTracingListByClient(name);
    }
    getAllTracingList() {
        return this.tracingRepository.getAllTracing();
    }
};
TracingService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [tracing_repository_1.TracingRepository])
], TracingService);
exports.TracingService = TracingService;
//# sourceMappingURL=tracing.service.js.map