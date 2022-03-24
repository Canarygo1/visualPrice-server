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
exports.CarrefourService = void 0;
const tsyringe_1 = require("tsyringe");
const tracingHistory_model_1 = require("../models/tracingHistory.model");
const parseCurrency_1 = require("../utils/parseCurrency");
const scrapingbee = require('scrapingbee');
const { JSDOM } = require("jsdom");
let CarrefourService = class CarrefourService {
    constructor() {
    }
    scraping(tracing) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new scrapingbee.ScrapingBeeClient('AO2U2FXKUEZK7SMNA1VDNNL2ACVTACIFIN59MN9BOVIDR5J9PAG4QUQLUDJZ52ZPW5BC1K0XKFAQO59C');
            console.log(tracing.product.ean);
            console.log(tracing.product.name);
            let url = "https://www.carrefour.es/?q=" + tracing.product.ean;
            let price = "";
            let decimalPrice = 0;
            let link = "";
            let promotionType = "";
            let isPromotion = false;
            let isSale = false;
            let isOutStock = false;
            let response = yield client.get({
                url: url,
                params: {
                    render_js: 'true',
                    wait: '2000',
                    timeout: '15000'
                },
                cookies: {
                    "salepoint": tracing.PostalCode.shopId,
                },
            });
            let decoder = new TextDecoder();
            let texto = decoder.decode(response.data);
            // console.log(texto);
            const dom = new JSDOM(texto);
            let prueba = yield dom.window.document.getElementsByClassName("ebx-result__wrapper");
            let noResults = yield dom.window.document.getElementsByClassName("ebx-no-results");
            if (prueba.length === 0 && noResults.length === 0) {
                throw 'Resource not loaded';
            }
            if (noResults.length > 0) {
                isOutStock = true;
                console.log(isOutStock);
            }
            if (noResults.length === 0) {
                for (let i = 0; i < prueba.length; i++) {
                    price = prueba[i].querySelectorAll(".ebx-result-price__value")[0].textContent;
                    try {
                        promotionType = prueba[i].querySelectorAll(".ebx-result__banner")[0].textContent;
                        promotionType = prueba[i].querySelectorAll(".ebx-result__banner")[0].textContent;
                        if (promotionType !== undefined) {
                            isPromotion = true;
                        }
                    }
                    catch (e) {
                        promotionType = "";
                    }
                    try {
                        promotionType = prueba[i].querySelectorAll(".ebx-result-price__original-value")[0].textContent;
                        isSale = true;
                    }
                    catch (e) {
                        isSale = false;
                    }
                    link = prueba[i].querySelectorAll("a")[0].getAttribute("href");
                    console.log(link);
                }
            }
            if (link != tracing.url) {
                tracing.url = link;
            }
            if (price.length > 0) {
                decimalPrice = (0, parseCurrency_1.parseCurrency)(price);
            }
            return new tracingHistory_model_1.TracingHistoryModel("", promotionType, isOutStock, isPromotion, isSale, price, decimalPrice, tracing.id, "", "", "", 0);
        });
    }
    scrapingBySearch(searchContent) {
        return Promise.resolve(undefined);
    }
    scrapingErrors(htmlContent) {
        let fullContent = htmlContent.querySelectorAll(".price")[0];
        return fullContent.textContent;
    }
    scrapingByUrl(url) {
        return Promise.resolve(undefined);
    }
};
CarrefourService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], CarrefourService);
exports.CarrefourService = CarrefourService;
//# sourceMappingURL=carrefour.service.js.map