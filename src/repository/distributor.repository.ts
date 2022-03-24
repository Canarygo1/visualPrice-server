import {DistributorModel} from "../models/distributor.model";
import {SupabaseClient} from "@supabase/supabase-js";
import {autoInjectable} from "tsyringe";
import {SupabaseConnector} from "../utils/supabaseConnector";

@autoInjectable()
export class DistributorRepository implements IDistributorRepository{
    private client:SupabaseClient;


    constructor(client: SupabaseConnector) {
        this.client = client.client;
    }

    async getAllDistributors(): Promise<Array<DistributorModel>> {
        let {body, error} = await this.client
            .from('Distributor')
            .select('*');
            let distributors:Array<DistributorModel> = [];
            if (body){
                distributors = body.map((value)=>DistributorModel.fromDTO(value));
            }

            return distributors;

    }

    // getDistributorByPostalCode(postalCode: number): Promise<Array<DistributorModel>> {
    //     return Promise.resolve(undefined);
    // }

}

export interface IDistributorRepository{
    getAllDistributors():Promise<Array<DistributorModel>>
    // getDistributorByPostalCode(postalCode:number):Promise<Array<DistributorModel>>;
}
