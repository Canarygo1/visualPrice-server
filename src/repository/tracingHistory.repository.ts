import {TracingHistoryModel} from "../models/tracingHistory.model";
import {SupabaseConnector} from "../utils/supabaseConnector";
import {autoInjectable} from "tsyringe";
import {SupabaseClient} from "@supabase/supabase-js";
import {TracingModel} from "../models/tracing.model";

@autoInjectable()
export class TracingHistoryRepository implements ITracingHistoryRepository {

    private client:SupabaseClient;


    constructor(client: SupabaseConnector) {
        this.client = client.client;
    }

    async save(tracingHistory: TracingHistoryModel): Promise<boolean> {
        const {data, error} = await this.client
            .from('tracing_history')
            .insert({
                    price: tracingHistory.price,
                    is_promotion: tracingHistory.isPromotion,
                    is_sale: tracingHistory.isSale,
                    decimal_price:tracingHistory.decimalPrice,
                    is_out_stock: tracingHistory.isOutStock,
                    promotion_type: tracingHistory.PromotionType,
                    sale_type: tracingHistory.saleType,
                    tracing_id:tracingHistory.tracingId
            })

            return true
    }

    async getTracingHistoryById(tracing: TracingModel): Promise<Array<TracingHistoryModel>> {
        let {data,error} = await this.client
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
            .filter('Product.ean',"eq",tracing.product.ean)
            .order('created_at', { ascending: false ,foreignTable:'tracing_history'})

        let tracingHistoryList = [];
        if (data) {
            for (let i = 0;i < data[0].tracing_history.length;i++) {
                let tracingHistory = TracingHistoryModel.fromDTO(data[0].tracing_history[i]);
                tracingHistoryList.push(tracingHistory);
            }
        }
        return tracingHistoryList;
    }

}
export interface ITracingHistoryRepository{
    save(tracingHistory:TracingHistoryModel):Promise<boolean>;
    getTracingHistoryById(tracing:TracingModel):Promise<Array<TracingHistoryModel>>
}
