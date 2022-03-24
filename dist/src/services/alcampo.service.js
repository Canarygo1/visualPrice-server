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
exports.AlcampoService = void 0;
const tsyringe_1 = require("tsyringe");
const tracingHistory_model_1 = require("../models/tracingHistory.model");
const parseCurrency_1 = require("../utils/parseCurrency");
const ScrapingBeeSearch_1 = require("../utils/ScrapingBeeSearch");
const scrapingbee = require('scrapingbee');
const { JSDOM } = require("jsdom");
let AlcampoService = class AlcampoService {
    constructor() {
    }
    scrapingByEAN(tracing, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let price = "";
            let decimalPrice = 0;
            let link = "";
            let promotionType = "";
            let isPromotion = false;
            let isOutStock = false;
            let saleType = "";
            let isSale = false;
            let decoder = new TextDecoder();
            let texto = decoder.decode(response.data);
            const dom = new JSDOM(texto);
            let prueba = dom.window.document.getElementsByClassName("productGridItemContainer");
            for (let i = 0; i < prueba.length; i++) {
                link = yield prueba[i].querySelectorAll("a")[0].getAttribute("href");
                let fullContent = yield prueba[i].querySelectorAll(".priceContainer")[0];
                try {
                    let price2 = fullContent.querySelectorAll(".price")[0];
                    let elem = price2.querySelectorAll('.pesoVariable')[0];
                    let outStock = prueba[i].querySelectorAll('.out-of-stock');
                    if (outStock.length > 0) {
                        isOutStock = true;
                    }
                    if (elem != undefined) {
                        price2.removeChild(elem);
                    }
                    price = price2.textContent;
                    try {
                        promotionType = prueba[i].querySelectorAll(".promo_info__type")[0].textContent;
                        console.log(promotionType);
                        isPromotion = true;
                    }
                    catch (e) {
                        saleType = "";
                    }
                }
                catch (e) {
                    console.log("error con el EAN: " + tracing.product.ean + "\n Nombre: " + tracing.product.name);
                    console.log("Intentando Solventarlo...");
                    console.log(e);
                    price = this.scrapingErrors(prueba[i]);
                }
            }
            if (price.length > 0) {
                decimalPrice = (0, parseCurrency_1.parseCurrency)(price);
                tracing.url = link;
            }
            else {
                tracing.status = "No encontrado";
            }
            return new tracingHistory_model_1.TracingHistoryModel("", promotionType, isOutStock, isPromotion, isSale, price, decimalPrice, tracing.id, "", "", "", 0);
        });
    }
    scraping(tracing) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new scrapingbee.ScrapingBeeClient('AO2U2FXKUEZK7SMNA1VDNNL2ACVTACIFIN59MN9BOVIDR5J9PAG4QUQLUDJZ52ZPW5BC1K0XKFAQO59C');
            let url = "https://www.alcampo.es/compra-online/search/?text=" + tracing.product.ean;
            console.log(tracing.searchType);
            if (tracing.searchType === 'EAN') {
                url = "https://www.alcampo.es/compra-online/search/?text=" + tracing.product.ean;
                let cookies = {
                    "cp": tracing.PostalCode.code.toString(),
                    "shopId": tracing.PostalCode.shopId,
                };
                let response = yield (0, ScrapingBeeSearch_1.scrapingBeeSearch)(cookies, url);
                return this.scrapingByEAN(tracing, response);
            }
            else if (tracing.searchType === 'URL') {
                url = "https://www.alcampo.es/compra-online/search/?text=" + tracing.product.ean;
                let cookies = {
                    "cp": tracing.PostalCode.code.toString(),
                    "shopId": tracing.PostalCode.shopId,
                };
                let response = yield (0, ScrapingBeeSearch_1.scrapingBeeSearch)(cookies, url);
                return this.scrapingByEAN(tracing, response);
            }
            else {
                throw 'error no URL ni EAN en Search type';
            }
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
AlcampoService = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [])
], AlcampoService);
exports.AlcampoService = AlcampoService;
//# sourceMappingURL=alcampo.service.js.map