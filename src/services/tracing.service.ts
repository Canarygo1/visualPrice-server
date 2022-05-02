import {TracingModel} from "../models/tracing.model";
import {ITracingRepository, TracingRepository} from "../repository/tracing.repository";
import {autoInjectable} from "tsyringe";
import {ErrorTracingModel} from "../models/error.model";

@autoInjectable()
export class TracingService implements ITracingService{
    private tracingRepository:ITracingRepository;

    constructor(tracingRepository: TracingRepository) {
        this.tracingRepository = tracingRepository;
    }

    async getTracingListByDistributor(): Promise<Array<TracingModel>> {
        return await this.tracingRepository.getTracingByDistributorName('Alcampo');
    }

    getTracingListByClientCpPostalCode(clientName: string,distributorName:string,postalCode:Number): Promise<Array<TracingModel>> {
        return this.tracingRepository.getTracingByDistributorAndClient(distributorName,clientName,postalCode);
    }


    updateTracing(tracing:TracingModel):Promise<boolean> {
        return this.tracingRepository.updateTracing(tracing);
    }

    getTracingByErrorTracingModel(tracingList: Array<ErrorTracingModel>): Promise<Array<TracingModel>> {
        let tracingIds:Array<string>= [];
        for (let i = 0;i<tracingList.length;i++){
            tracingIds.push(tracingList[i].tracingId);
        }
        return this.tracingRepository.getTracingByIdList(tracingIds);
    }

    getTracingListByClient(name: string): Promise<Array<TracingModel>> {
        return this.tracingRepository.getTracingListByClient(name);
    }

    getAllTracingList(): Promise<Array<TracingModel>> {
        return this.tracingRepository.getAllTracing();
    }


}

export interface ITracingService{
    getTracingListByDistributor():Promise<Array<TracingModel>>;
    getAllTracingList():Promise<Array<TracingModel>>;
    getTracingListByClient(client:string):Promise<Array<TracingModel>>;
    updateTracing(tracing:TracingModel):Promise<boolean>;
    getTracingListByClientCpPostalCode(clientName:string,distributorName:string,postalCode:Number):Promise<Array<TracingModel>>
    getTracingByErrorTracingModel(tracingList:Array<ErrorTracingModel>):Promise<Array<TracingModel>>
}
