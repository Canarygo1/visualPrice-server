import {TracingHistoryModel} from "../models/tracingHistory.model";
import {autoInjectable} from "tsyringe";
import {ITracingHistoryRepository, TracingHistoryRepository} from "../repository/tracingHistory.repository";
import {TracingModel} from "../models/tracing.model";
import {SupabaseClient} from "@supabase/supabase-js";
import {SupabaseConnector} from "../utils/supabaseConnector";

@autoInjectable()
export class TracingHistoryService implements ITracingHistoryService{
    tracingRepository:ITracingHistoryRepository;
    private client:SupabaseClient;

    constructor(tracingRepository: TracingHistoryRepository, client:SupabaseConnector) {
        this.tracingRepository = tracingRepository;
        this.client = client.client;
    }


    async save(tracingHistory: TracingHistoryModel): Promise<boolean> {
        console.log("insertando");
        let insert = await this.tracingRepository.save(tracingHistory);
        return Promise.resolve(true);
    }

    async isForSave(tracing: TracingModel,currentTracingHistory:TracingHistoryModel): Promise<boolean> {
        let tracingHistory = await this.tracingRepository.getTracingHistoryById(tracing);
        let changeType = "";
        if (currentTracingHistory.decimalPrice != tracingHistory[0].decimalPrice && currentTracingHistory.decimalPrice!=0) changeType=changeType+"precio, "
        if (currentTracingHistory.isOutStock != tracingHistory[0].isOutStock) changeType=changeType+"stock, "
        if (currentTracingHistory.PromotionType != tracingHistory[0].PromotionType) changeType=changeType+"promoción, "
        if (currentTracingHistory.isSale != tracingHistory[0].isSale) changeType=changeType+"oferta, "

        currentTracingHistory.changeType = changeType
        console.log("TIPO:"+changeType);
        if (tracingHistory.length === 0){
            console.log(currentTracingHistory.decimalPrice);
            return true;
        }
        currentTracingHistory.previousDecimalPrice = tracingHistory[0].previousDecimalPrice;
        console.log(tracingHistory[0].decimalPrice + ' ' + currentTracingHistory.decimalPrice)
        if (currentTracingHistory.isOutStock != tracingHistory[0].isOutStock){
            if (currentTracingHistory.decimalPrice === 0){
                currentTracingHistory.decimalPrice = tracingHistory[0].decimalPrice;
                currentTracingHistory.price = tracingHistory[0].price;
            }

            return true;
        }
        if (currentTracingHistory.decimalPrice === 0){
            return false;
        }
        if (currentTracingHistory.isSale != tracingHistory[0].isSale){

            return true;
        }
        if (currentTracingHistory.PromotionType != tracingHistory[0].PromotionType){

            return true;
        }

        return tracingHistory[0].decimalPrice !== currentTracingHistory.decimalPrice;
    }


}

export interface ITracingHistoryService{
    save(tracingHistory:TracingHistoryModel):Promise<boolean>;
    isForSave(tracing: TracingModel,currentTracingHistory:TracingHistoryModel): Promise<boolean>}
