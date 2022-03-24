import {TracingModel} from "../models/tracing.model";
import {TracingHistoryModel} from "../models/tracingHistory.model";

export interface IScrapingService {

    //Todo:Hay que enviarle un obj de tipo Product. Devolver un TracingData
    scraping(tracing:TracingModel):Promise<TracingHistoryModel>;

}
