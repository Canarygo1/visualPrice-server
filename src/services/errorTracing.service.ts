
import {autoInjectable} from "tsyringe";
import {ErrorTracingModel} from "../models/error.model";
import {ErrorTracingRepository, IErrorTracingRepository} from "../repository/erorrTracing.repository";

@autoInjectable()
export class ErrorTracingService implements IErrorTracingService{
    private errorTracing:IErrorTracingRepository;

    constructor(tracingRepository:ErrorTracingRepository ) {
        this.errorTracing = tracingRepository;
    }

    setErrorTracing(error:any,tracingId:string): Promise<boolean> {

        let type = "";
        if (error.isAxiosError){
            type= "500 TIMEOUT"
        }else {
            type = error
        }
        let errorTracingModel:ErrorTracingModel = new ErrorTracingModel("",type,tracingId,"");

        return this.errorTracing.save(errorTracingModel);

    }

    getTodayErrorTracing(): Promise<Array<ErrorTracingModel>> {
        let startDate = new Date (Date.now());
        startDate.setUTCHours(0,0,0,0)
        let endDate = new Date (Date.now());
        endDate.setUTCHours(23,59,59,59);

        return this.errorTracing.getAllFromInterval(startDate,endDate);
    }

    deleteErrorTracing(errorTracing: ErrorTracingModel): Promise<boolean> {

        return this.errorTracing.deleteById(errorTracing.id);
    }

}

export interface IErrorTracingService{
    setErrorTracing(error:any,tracingId:string):Promise<boolean>;
    getTodayErrorTracing():Promise<Array<ErrorTracingModel>>;
    deleteErrorTracing(errorTracing:ErrorTracingModel):Promise<boolean>

}
