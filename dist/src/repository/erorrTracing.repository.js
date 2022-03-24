"use strict";
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
exports.ErrorTracingRepository = void 0;
const supabaseConnector_1 = require("../utils/supabaseConnector");
const error_model_1 = require("../models/error.model");
class ErrorTracingRepository {
    constructor() {
        this.client = new supabaseConnector_1.SupabaseConnector().client;
    }
    save(errorTracingModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.client
                .from('error_tracing')
                .insert({
                type: errorTracingModel.type,
                tracing_id: errorTracingModel.tracingId
            });
            return true;
        });
    }
    getAllFromInterval(startDay, endDay) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorTracingList = [];
            const { data, error } = yield this.client
                .from('error_tracing')
                .select('*').gt('created_at', startDay.toISOString()).lt('created_at', endDay.toISOString());
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    let errorTracingModel = error_model_1.ErrorTracingModel.fromDTO(data[i]);
                    errorTracingList.push(errorTracingModel);
                }
                return errorTracingList;
            }
            else {
                throw error;
            }
        });
    }
    deleteById(errorTracingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.client
                .from('error_tracing').delete().eq('id', errorTracingId);
            if (!error) {
                return true;
            }
            else {
                throw error;
            }
        });
    }
}
exports.ErrorTracingRepository = ErrorTracingRepository;
//# sourceMappingURL=erorrTracing.repository.js.map