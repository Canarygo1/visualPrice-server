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
exports.TracingHistoryRepository = void 0;
const tracingHistory_model_1 = require("../models/tracingHistory.model");
const supabaseConnector_1 = require("../utils/supabaseConnector");
const tsyringe_1 = require("tsyringe");
let TracingHistoryRepository = class TracingHistoryRepository {
    constructor(client) {
        this.client = client.client;
    }
    save(tracingHistory) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.client
                .from('tracing_history')
                .insert({
                price: tracingHistory.price,
                is_promotion: tracingHistory.isPromotion,
                is_sale: tracingHistory.isSale,
                decimal_price: tracingHistory.decimalPrice,
                is_out_stock: tracingHistory.isOutStock,
                promotion_type: tracingHistory.PromotionType,
                sale_type: tracingHistory.saleType,
                tracing_id: tracingHistory.tracingId
            });
            return true;
        });
    }
    getTracingHistoryById(tracing) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data, error } = yield this.client
                .from('Tracing')
                .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                tracing_history(*),
                Product!inner(*),
                Client!inner(*)
              `).filter('Postal_Code.code', 'eq', tracing.PostalCode.code)
                .filter('Distributor.name', 'eq', tracing.distributor.name)
                .filter('Client.name', 'eq', tracing.client.name)
                .filter('Product.ean', "eq", tracing.product.ean)
                .order('created_at', { ascending: false, foreignTable: 'tracing_history' });
            let tracingHistoryList = [];
            if (data) {
                for (let i = 0; i < data[0].tracing_history.length; i++) {
                    let tracingHistory = tracingHistory_model_1.TracingHistoryModel.fromDTO(data[0].tracing_history[i]);
                    tracingHistoryList.push(tracingHistory);
                }
            }
            return tracingHistoryList;
        });
    }
};
TracingHistoryRepository = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [supabaseConnector_1.SupabaseConnector])
], TracingHistoryRepository);
exports.TracingHistoryRepository = TracingHistoryRepository;
//# sourceMappingURL=tracingHistory.repository.js.map