"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.ScrappingController = void 0;
const alcampo_service_1 = require("../services/alcampo.service");
const tsyringe_1 = require("tsyringe");
const tracing_service_1 = require("../services/tracing.service");
const TracingHistory_service_1 = require("../services/TracingHistory.service");
const carrefour_service_1 = require("../services/carrefour.service");
const elcorteingles_service_1 = require("../services/elcorteingles.service");
const tutrebol_service_1 = require("../services/tutrebol.service");
const errorTracing_service_1 = require("../services/errorTracing.service");
// noinspection DuplicatedCode
let ScrappingController = class ScrappingController {
    constructor(alcampoService, tuTrebolService, carrefourService, elcorteinglesService, tracingService, tracingHistoryService, errorTracingService) {
        this.contador = 0;
        this.alcampoService = alcampoService;
        this.carrefourService = carrefourService;
        this.tutrebolService = tuTrebolService;
        this.elcorteinglesService = elcorteinglesService;
        this.tracingService = tracingService;
        this.tracingHistoryService = tracingHistoryService;
        this.errorTracingService = errorTracingService;
    }
    checkForService(distributor) {
        return __awaiter(this, void 0, void 0, function* () {
            if (distributor === "Alcampo") {
                return this.alcampoService;
            }
            else if (distributor === "Carrefour") {
                return this.carrefourService;
            }
            else if (distributor === "El Corte Inglés") {
                return this.elcorteinglesService;
            }
            else if (distributor === "TuTrebol") {
                return this.tutrebolService;
            }
            throw "No existe un service para el campo " + distributor;
        });
    }
    scrapingInit() {
        return __awaiter(this, void 0, void 0, function* () {
            let tracingList = yield this.tracingService.getAllTracingList();
            let thread = 9;
            let itemPerThread = tracingList.length / thread | 0;
            // let rest = tracingList.length - itemPerThread * thread;
            // let itemslastThread = itemPerThread + rest;
            for (let i = 0; i < thread - 1; i++) {
                this.startThread(tracingList, i * itemPerThread, (i + 1) * itemPerThread);
            }
            this.startThread(tracingList, itemPerThread * (thread - 1), tracingList.length);
        });
    }
    startThread(tracingList, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = from; i < to; i++) {
                this.contador = this.contador + 1;
                console.log("Vamos por el [ " + i + " ]de [ " + to + " ]");
                console.log("Total scrapper: " + this.contador);
                yield this.scrapingFromTracing(tracingList[i]);
            }
        });
    }
    scrapingErrors() {
        return __awaiter(this, void 0, void 0, function* () {
            let errorTodayList = yield this.errorTracingService.getTodayErrorTracing();
            let tracingList = yield this.tracingService.getTracingByErrorTracingModel(errorTodayList);
            for (let i = 0; i < tracingList.length; i++) {
                yield this.errorTracingService.deleteErrorTracing(errorTodayList[i]);
                let scrapingResult = yield this.scrapingFromTracing(tracingList[i]);
            }
        });
    }
    scrapingFromTracing(tracing) {
        return __awaiter(this, void 0, void 0, function* () {
            let maxRetry = 2;
            let succes = false;
            let scrapingService = yield this.checkForService(tracing.distributor.name);
            // console.log(tracingList[i]);
            while (maxRetry > 0 && !succes) {
                console.log(tracing.product.ean + " " + tracing.distributor.name + " " +
                    tracing.PostalCode.code + " " + tracing.client.name);
                let tracingHistoryItem;
                let time = getRandomArbitrary(100, 600);
                setTimeout(() => {
                }, Math.floor(time));
                try {
                    tracingHistoryItem = yield scrapingService.scraping(tracing);
                    let isForSave = yield this.tracingHistoryService.isForSave(tracing, tracingHistoryItem);
                    if (isForSave) {
                        yield this.tracingHistoryService.save(tracingHistoryItem);
                    }
                    if (tracing.hadChange) {
                        yield this.tracingService.updateTracing(tracing);
                    }
                    succes = true;
                    console.log(tracing.product.ean + " " + tracing.distributor.name + " " +
                        tracing.PostalCode.code + " " + tracing.client.name);
                }
                catch (e) {
                    console.log(e);
                    if (e === 'Resource not loaded') {
                        maxRetry = 0;
                    }
                    else {
                        maxRetry = maxRetry - 1; //ENOTFOUND
                        if (e.code !== 'ECONNRESET') {
                            if (e.response.status === 429) {
                                console.log('El hilo esta ocupado, a dormir 30sec ');
                                yield sleep(30000);
                                maxRetry = maxRetry + 1;
                            }
                            if (e.response.status === 500) {
                                yield sleep(10000);
                            }
                        }
                    }
                    if (maxRetry === 0) {
                        yield this.errorTracingService.setErrorTracing(e, tracing.id);
                    }
                    console.log("RETRYYY");
                }
                console.log("/////////////////////////////////");
            }
            return succes;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.scrapingErrors()
            console.log("TESTEANDO 2");
            yield this.scrapingInit();
        });
    }
};
ScrappingController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [alcampo_service_1.AlcampoService,
        tutrebol_service_1.TuTrebolService,
        carrefour_service_1.CarrefourService, elcorteingles_service_1.ElCorteInglesService, tracing_service_1.TracingService,
        TracingHistory_service_1.TracingHistoryService, errorTracing_service_1.ErrorTracingService])
], ScrappingController);
exports.ScrappingController = ScrappingController;
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
//# sourceMappingURL=srapping.controller.js.map