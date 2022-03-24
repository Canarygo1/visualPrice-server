import {IScrapingService} from "../utils/IScrapingService";
import {AlcampoService} from "../services/alcampo.service";
import {autoInjectable} from "tsyringe";
import {TracingModel} from "../models/tracing.model";
import {ITracingService, TracingService} from "../services/tracing.service";
import {ITracingHistoryService, TracingHistoryService} from "../services/TracingHistory.service";
import {CarrefourService} from "../services/carrefour.service";
import {ElCorteInglesService} from "../services/elcorteingles.service";
import {TuTrebolService} from "../services/tutrebol.service";
import {TracingHistoryModel} from "../models/tracingHistory.model";
import {
    alcampoParseCurrency,
    alcampoParseCurrency2,
    parseContainerToCurrency,
    parseCurrency
} from "../utils/parseCurrency";
import {ErrorTracingModel} from "../models/error.model";
import {ErrorTracingService, IErrorTracingService} from "../services/errorTracing.service";
import {AxiosError} from "axios";

// noinspection DuplicatedCode
@autoInjectable()
export class ScrappingController {
    alcampoService: IScrapingService;
    carrefourService: IScrapingService;
    elcorteinglesService: IScrapingService;
    tutrebolService: IScrapingService;
    tracingService: ITracingService;
    tracingHistoryService: ITracingHistoryService;
    errorTracingService: IErrorTracingService;

    constructor(alcampoService: AlcampoService,
                tuTrebolService: TuTrebolService,
                carrefourService: CarrefourService, elcorteinglesService: ElCorteInglesService, tracingService: TracingService,
                tracingHistoryService: TracingHistoryService, errorTracingService: ErrorTracingService) {
        this.alcampoService = alcampoService;
        this.carrefourService = carrefourService;
        this.tutrebolService = tuTrebolService;
        this.elcorteinglesService = elcorteinglesService;
        this.tracingService = tracingService;
        this.tracingHistoryService = tracingHistoryService;
        this.errorTracingService = errorTracingService;
    }

    async checkForService(distributor: string): Promise<IScrapingService> {
        if (distributor === "Alcampo") {
            return this.alcampoService;
        } else if (distributor === "Carrefour") {
            return this.carrefourService;
        } else if (distributor === "El Corte Inglés") {
            return this.elcorteinglesService;
        } else if (distributor === "TuTrebol") {
            return this.tutrebolService;
        }
        throw "No existe un service para el campo " + distributor;
    }

    async scrapingInit(clientName: string) {
        let tracingList: Array<TracingModel> = await this.tracingService.getTracingListByClient(clientName);
        // let tracingList: Array<TracingModel> = await this.tracingService.getTracingListByClientCpPostalCode(clientName, 'El Corte Inglés', 38001);
        for (let i = 0; i < tracingList.length; i++) {
            console.log("Vamos por el [ " + i + " ]de [ " + tracingList.length + " ]")
            await this.scrapingFromTracing(tracingList[i]);
        }
    }

    async scrapingErrors() {
        let errorTodayList: Array<ErrorTracingModel> = await this.errorTracingService.getTodayErrorTracing();
        let tracingList: Array<TracingModel> = await this.tracingService.getTracingByErrorTracingModel(errorTodayList);
        for (let i = 0; i < tracingList.length; i++) {
            await this.errorTracingService.deleteErrorTracing(errorTodayList[i]);
            let scrapingResult = await this.scrapingFromTracing(tracingList[i]);
        }
    }

    async scrapingFromTracing(tracing: TracingModel): Promise<boolean> {
        let maxRetry: number = 2;
        let succes: boolean = false;
        let scrapingService: IScrapingService = await this.checkForService(tracing.distributor.name);
        // console.log(tracingList[i]);
        while (maxRetry > 0 && !succes) {
            console.log(tracing.product.ean + " " + tracing.distributor.name + " " +
                tracing.PostalCode.code + " " + tracing.client.name);
            let tracingHistoryItem: TracingHistoryModel;
            let time = getRandomArbitrary(100, 600)
            setTimeout(() => {
            }, Math.floor(time));
            try {
                tracingHistoryItem = await scrapingService.scraping(tracing);
                let isForSave = await this.tracingHistoryService.isForSave(tracing, tracingHistoryItem)
                if (isForSave) {
                    await this.tracingHistoryService.save(tracingHistoryItem);
                }
                if (tracing.hadChange) {
                    await this.tracingService.updateTracing(tracing);
                }
                succes = true;
                console.log(tracing.product.ean + " " + tracing.distributor.name + " " +
                    tracing.PostalCode.code + " " + tracing.client.name);

            } catch (e: any) {
                console.log(e)
                if (e === 'Resource not loaded') {
                    maxRetry = 0;
                } else {
                    maxRetry = maxRetry - 1;
                    if (e.response.status === 429) {
                        console.log('El hilo esta ocupado, a dormir 30sec ');
                        await sleep(30000);
                        maxRetry = maxRetry + 1;
                    }
                    if (e.response.status === 500) {
                        await sleep(10000);
                    }
                }
                if (maxRetry === 0) {
                    await this.errorTracingService.setErrorTracing(e, tracing.id)
                }
                console.log("RETRYYY")
            }
            console.log("/////////////////////////////////")

        }
        return succes;
    }

    async init() {
        let clients = ["DinoSol", "Arias"];
        // await this.scrapingErrors()
        for (let i = 0; i < 1; i++) {
            console.log("Empezando con el CLIENTE" + clients[i]);
            await this.scrapingInit(clients[i]);
        }
    }
}

function sleep(ms: any) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
