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
exports.TracingRepository = void 0;
const supabaseConnector_1 = require("../utils/supabaseConnector");
const tracing_model_1 = require("../models/tracing.model");
class TracingRepository {
    constructor() {
        this.supabaseConnector = new supabaseConnector_1.SupabaseConnector().client;
    }
    getAllTracing() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.supabaseConnector
                .from('Tracing')
                .select(`
    *,
    Distributor (
      *
    ),
    Postal_Code(
    *
    ),
    Product(
    *
    )
  `);
            let tracingList = [];
            if (data.body) {
                let tracingData = data.body;
                for (let i = 0; i < tracingData.length; i++) {
                    let tracing = tracing_model_1.TracingModel.fromDTO(tracingData[i]);
                    tracingList.push(tracing);
                }
            }
            return tracingList;
        });
    }
    getTracingByDistributorName(distributorName) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.supabaseConnector
                .from('Tracing')
                .select(`
                *,
                Distributor (
                  *
                ),
                Postal_Code(
                *
                ),
                Product(
                *
                )
              `).eq('Distributor.name', distributorName);
            let tracingList = [];
            if (data.body) {
                let tracingData = data.body;
                for (let i = 0; i < tracingData.length; i++) {
                    let tracing = tracing_model_1.TracingModel.fromDTO(tracingData[i]);
                    tracingList.push(tracing);
                }
            }
            return tracingList;
        });
    }
    getTracingByDistributorAndClient(distributorName, clientName, postalCode) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(postalCode);
            console.log(distributorName);
            console.log(clientName);
            let data = yield this.supabaseConnector
                .from('Tracing')
                .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                Product(*),
                Client!inner(*)
              `).filter('Postal_Code.code', 'eq', postalCode)
                .filter('Distributor.name', 'eq', distributorName)
                .filter('Client.name', 'eq', clientName)
                .order('created_at', { ascending: true });
            let tracingList = [];
            if (data.body) {
                let tracingData = data.body;
                for (let i = 0; i < tracingData.length; i++) {
                    let tracing = tracing_model_1.TracingModel.fromDTO(tracingData[i]);
                    tracingList.push(tracing);
                }
            }
            return tracingList;
        });
    }
    updateTracing(tracing) {
        return __awaiter(this, void 0, void 0, function* () {
            let { error } = yield this.supabaseConnector
                .from('Tracing')
                .update({
                url: tracing.url,
                status: tracing.status,
                search_type: tracing.searchType
            })
                .match({ id: tracing.id });
            return Promise.resolve(false);
        });
    }
    getTracingByIdList(tracingIdsList) {
        return __awaiter(this, void 0, void 0, function* () {
            let tracingList = [];
            console.log(tracingIdsList);
            let { data, error } = yield this.supabaseConnector
                .from('Tracing')
                .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                Product!inner(*),
                Client!inner(*)
              `)
                .in("id", tracingIdsList);
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    let tracing = tracing_model_1.TracingModel.fromDTO(data[i]);
                    tracingList.push(tracing);
                }
                return tracingList;
            }
            else {
                console.log(tracingIdsList);
                console.log(error);
                throw error;
            }
        });
    }
    getTracingListByClient(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.supabaseConnector
                .from('Tracing')
                .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                Product(*),
                Client!inner(*)
              `)
                .filter('Client.name', 'eq', name)
                .order('id', { ascending: true });
            let tracingList = [];
            if (data.body) {
                let tracingData = data.body;
                for (let i = 0; i < tracingData.length; i++) {
                    let tracing = tracing_model_1.TracingModel.fromDTO(tracingData[i]);
                    tracingList.push(tracing);
                }
            }
            return tracingList;
        });
    }
}
exports.TracingRepository = TracingRepository;
//# sourceMappingURL=tracing.repository.js.map