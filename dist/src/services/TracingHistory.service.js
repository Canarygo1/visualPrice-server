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
exports.TracingHistoryService = void 0;
const tsyringe_1 = require("tsyringe");
const tracingHistory_repository_1 = require("../repository/tracingHistory.repository");
const supabaseConnector_1 = require("../utils/supabaseConnector");
let TracingHistoryService = class TracingHistoryService {
    constructor(tracingRepository, client) {
        this.tracingRepository = tracingRepository;
        this.client = client.client;
    }
    save(tracingHistory) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("insertando");
            let insert = yield this.tracingRepository.save(tracingHistory);
            return Promise.resolve(true);
        });
    }
    isForSave(tracing, currentTracingHistory) {
        return __awaiter(this, void 0, void 0, function* () {
            let tracingHistory = yield this.tracingRepository.getTracingHistoryById(tracing);
            let changeType = "";
            if (currentTracingHistory.decimalPrice != tracingHistory[0].decimalPrice && currentTracingHistory.decimalPrice != 0)
                changeType = changeType + "precio, ";
            if (currentTracingHistory.isOutStock != tracingHistory[0].isOutStock)
                changeType = changeType + "stock, ";
            if (currentTracingHistory.PromotionType != tracingHistory[0].PromotionType)
                changeType = changeType + "promoción, ";
            if (currentTracingHistory.isSale != tracingHistory[0].isSale)
                changeType = changeType + "oferta, ";
            currentTracingHistory.changeType = changeType;
            console.log("TIPO:" + changeType);
            if (tracingHistory.length === 0) {
                console.log(currentTracingHistory.decimalPrice);
                return true;
            }
            currentTracingHistory.previousDecimalPrice = tracingHistory[0].previousDecimalPrice;
            console.log(tracingHistory[0].decimalPrice + ' ' + currentTracingHistory.decimalPrice);
            if (currentTracingHistory.isOutStock != tracingHistory[0].isOutStock) {
                if (currentTracingHistory.decimalPrice === 0) {
                    currentTracingHistory.decimalPrice = tracingHistory[0].decimalPrice;
                    currentTracingHistory.price = tracingHistory[0].price;
                }
                return true;
            }
            if (currentTracingHistory.decimalPrice === 0) {
                return false;
            }
            if (currentTracingHistory.isSale != tracingHistory[0].isSale) {
                return true;
            }
            if (currentTracingHistory.PromotionType != tracingHistory[0].PromotionType) {
                return true;
            }
            return tracingHistory[0].decimalPrice !== currentTracingHistory.decimalPrice;
        });
    }
};
TracingHistoryService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [tracingHistory_repository_1.TracingHistoryRepository, supabaseConnector_1.SupabaseConnector])
], TracingHistoryService);
exports.TracingHistoryService = TracingHistoryService;
//# sourceMappingURL=TracingHistory.service.js.map