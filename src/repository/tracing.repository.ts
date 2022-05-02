import {SupabaseConnector} from "../utils/supabaseConnector";
import {ITracingDTO, TracingModel} from "../models/tracing.model";

export class TracingRepository implements ITracingRepository {
    private supabaseConnector = new SupabaseConnector().client;

    async getAllTracing(): Promise<any> {
        let data = await this.supabaseConnector
            .from('Tracing')
            .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                Product(*),
                Client!inner(*)
              `)
            .order("id", { ascending: true })
            .range(0,1000)

        let data2:any = await this.supabaseConnector
            .from('Tracing')
            .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                Product(*),
                Client!inner(*)
              `)
            .order("id", { ascending: true })
            .range(1000,2000)

        let data3:any = await this.supabaseConnector
            .from('Tracing')
            .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                Product(*),
                Client!inner(*)
              `)
            .order("id", { ascending: true })
            .range(2000,3000)
        let tracingList: Array<TracingModel> = [];

        if (data.body) {
            let tracingData: Array<ITracingDTO> = data.body;
            tracingData = tracingData.concat(data2.body);
            tracingData = tracingData.concat(data3.body);
            console.log(tracingData.length);

            for (let i = 0; i < tracingData.length; i++) {
                let tracing = TracingModel.fromDTO(tracingData[i]);
                tracingList.push(tracing);
            }
        }
        return tracingList;
    }

    async getTracingByDistributorName(distributorName: String): Promise<Array<TracingModel>> {
        let data = await this.supabaseConnector
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
              `).eq('Distributor.name',distributorName)
        let tracingList: Array<TracingModel> = [];
        if (data.body) {
            let tracingData: Array<ITracingDTO> = data.body;

            for (let i = 0; i < tracingData.length; i++) {
                let tracing = TracingModel.fromDTO(tracingData[i]);
                tracingList.push(tracing);
            }
        }
        return tracingList;
    }

    async getTracingByDistributorAndClient(distributorName: String, clientName: String, postalCode:Number): Promise<Array<TracingModel>> {
        console.log(postalCode);
        console.log(distributorName)
        console.log(clientName);
        let data = await this.supabaseConnector
            .from('Tracing')
            .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                Product(*),
                Client!inner(*)
              `).filter('Postal_Code.code','eq',postalCode)
            .filter('Distributor.name','eq',distributorName)
            .filter('Client.name','eq',clientName)
            .order(
                'created_at',{ascending:true})

        let tracingList: Array<TracingModel> = [];
        if (data.body) {
            let tracingData: Array<ITracingDTO> = data.body;

            for (let i = 0; i < tracingData.length; i++) {
                let tracing = TracingModel.fromDTO(tracingData[i]);
                tracingList.push(tracing);
            }
        }
        return tracingList;
    }

    async updateTracing(tracing:TracingModel): Promise<boolean> {
        let {error} = await this.supabaseConnector
            .from('Tracing')
            .update({
                url:tracing.url,
                status:tracing.status,
                search_type:tracing.searchType
            })
            .match({ id:tracing.id })
        return Promise.resolve(false);
    }

    async getTracingByIdList(tracingIdsList: Array<string>): Promise<Array<TracingModel>> {
        let tracingList:Array<TracingModel>=[];
        console.log(tracingIdsList);

        let {data, error} = await this.supabaseConnector
            .from('Tracing')
            .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                Product!inner(*),
                Client!inner(*)
              `)
            .in("id",tracingIdsList);
        console.log(error)
        if (data){
            for (let i = 0;i<data.length;i++){
                let tracing:TracingModel = TracingModel.fromDTO(data[i]);
                tracingList.push(tracing);
            }
            return tracingList;
        }else {
            console.log(tracingIdsList);
            console.log(error);
            throw error;
        }
    }

    async getTracingListByClient(name: string): Promise<Array<TracingModel>> {
        let data = await this.supabaseConnector
            .from('Tracing')
            .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                Product(*),
                Client!inner(*)
              `)
            .filter('Client.name', 'eq', name)
            .order(
                'id', {ascending: true})

        let tracingList: Array<TracingModel> = [];
        if (data.body) {
            let tracingData: Array<ITracingDTO> = data.body;

            for (let i = 0; i < tracingData.length; i++) {
                let tracing = TracingModel.fromDTO(tracingData[i]);
                tracingList.push(tracing);
            }
        }
        return tracingList;
    }
}

export interface ITracingRepository {
    getTracingByDistributorAndClient(distributorName: String,clientName:String,postalCode:Number): Promise<Array<TracingModel>>;
    getTracingByDistributorName(distributorName: String): Promise<Array<TracingModel>>;
    getTracingListByClient(name:string):Promise<Array<TracingModel>>;
    getAllTracing(): Promise<any>;
    updateTracing(tracing:TracingModel):Promise<boolean>;
    getTracingByIdList(tracingIdsList:Array<string>):Promise<Array<TracingModel>>;

}
