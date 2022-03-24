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
exports.TuTrebolService = void 0;
const tsyringe_1 = require("tsyringe");
const tracingHistory_model_1 = require("../models/tracingHistory.model");
const parseCurrency_1 = require("../utils/parseCurrency");
const scrapingbee = require('scrapingbee');
const { JSDOM } = require("jsdom");
let TuTrebolService = class TuTrebolService {
    constructor() {
    }
    scraping(tracing) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new scrapingbee.ScrapingBeeClient('AO2U2FXKUEZK7SMNA1VDNNL2ACVTACIFIN59MN9BOVIDR5J9PAG4QUQLUDJZ52ZPW5BC1K0XKFAQO59C');
            let url = "https://www.tutrebol.es/buscar?controller=search&orderby=position&orderway=desc&listadoCompra=1&search_query=" + tracing.product.ean;
            let price = "";
            let decimalPrice = 0;
            let link = "";
            let promotionType = "";
            let isPromotion = false;
            let isOutStock = false;
            let saleType = "";
            let isSale = false;
            let response = yield client.get({
                url: url,
                params: {
                    wait: '2000',
                },
            });
            let decoder = new TextDecoder();
            let texto = decoder.decode(response.data);
            const dom = new JSDOM(texto);
            let prueba = dom.window.document.getElementsByClassName("product-container");
            for (let i = 0; i < prueba.length; i++) {
                // try {
                let fullContent = prueba[i].querySelectorAll(".product-price")[0];
                price = fullContent.textContent;
                try {
                    link = yield prueba[i].querySelectorAll("a")[0].getAttribute("href");
                    console.log(link);
                }
                catch (e) {
                }
                // try{
                //     saleType = prueba[i].querySelectorAll('[title="En oferta"]')[0].innerHTML;
                //     isSale = true;
                // }catch (e){
                //     saleType = "";
                // }
                // try {
                //     promotionType = prueba[i].querySelectorAll('.offer-description')[0].textContent;
                //     isPromotion=true;
                // }catch (e){
                //     isPromotion=false;
                // }
            }
            if (price.length > 0) {
                decimalPrice = (0, parseCurrency_1.alcampoParseCurrency)(price);
                tracing.url = link;
            }
            let tracingHistory = new tracingHistory_model_1.TracingHistoryModel("", promotionType, false, isPromotion, isSale, price, decimalPrice, tracing.id, "", "", "", 0);
            return tracingHistory;
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
TuTrebolService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], TuTrebolService);
exports.TuTrebolService = TuTrebolService;
//# sourceMappingURL=tutrebol.service.js.map