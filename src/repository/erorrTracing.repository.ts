import {SupabaseConnector} from "../utils/supabaseConnector";
import {ErrorTracingModel} from "../models/error.model";

export class ErrorTracingRepository implements IErrorTracingRepository {
    private client = new SupabaseConnector().client;


    async save(errorTracingModel: ErrorTracingModel): Promise<boolean> {
        const {data, error} = await this.client
            .from('error_tracing')
            .insert({
                type: errorTracingModel.type,
                tracing_id: errorTracingModel.tracingId
            })

        return true

    }

    async getAllFromInterval(startDay: Date, endDay: Date): Promise<Array<ErrorTracingModel>> {
        let errorTracingList: Array<ErrorTracingModel> = [];

        const {data, error} = await this.client
            .from('error_tracing')
            .select('*').gt('created_at', startDay.toISOString()).lt('created_at', endDay.toISOString());
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let errorTracingModel: ErrorTracingModel = ErrorTracingModel.fromDTO(data[i]);
                errorTracingList.push(errorTracingModel);
            }
            return errorTracingList;
        } else {
            throw error
        }
    }

    async deleteById(errorTracingId: string): Promise<boolean> {
        const {data, error} = await this.client
            .from('error_tracing').delete().eq('id',errorTracingId);
        if (!error){
            return true;
        }else{
            throw error;
        }
    }

}

export interface IErrorTracingRepository {
    save(errorTracingModel: ErrorTracingModel): Promise<boolean>;
    deleteById(errorTracingId:string):Promise<boolean>
    getAllFromInterval(startDay: Date, endDay: Date): Promise<Array<ErrorTracingModel>>;
}
