import {IScrapingService} from "../utils/IScrapingService";
import {autoInjectable} from "tsyringe";
import {TracingModel} from "../models/tracing.model";
import {TracingHistoryModel} from "../models/tracingHistory.model";
import {alcampoParseCurrency, parseContainerToCurrency, parseCurrency} from "../utils/parseCurrency";
import {scrapingBeeSearch} from "../utils/ScrapingBeeSearch";
import {AxiosResponse} from "axios";

const scrapingbee = require('scrapingbee');

const {JSDOM} = require("jsdom");

@autoInjectable()
export class AlcampoService implements IScrapingService, IAlcampoService {

    constructor() {
    }


    async scrapingByEAN(tracing: TracingModel, response: any): Promise<TracingHistoryModel> {
        let price = "";
        let decimalPrice: number = 0;
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
            link = await prueba[i].querySelectorAll("a")[0].getAttribute("href");
            let fullContent = await prueba[i].querySelectorAll(".priceContainer")[0];
            try {
                let price2 = fullContent.querySelectorAll(".price")[0];
                let elem = price2.querySelectorAll('.pesoVariable')[0];
                let outStock = prueba[i].querySelectorAll('.out-of-stock')
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
                } catch (e) {
                    saleType = "";
                }


            } catch (e) {
                console.log("error con el EAN: " + tracing.product.ean + "\n Nombre: " + tracing.product.name)
                console.log("Intentando Solventarlo...")
                console.log(e);
                price = this.scrapingErrors(prueba[i]);

            }
        }
        if (price.length > 0) {
            decimalPrice = parseCurrency(price);
            tracing.url = link;
        } else {
            tracing.status = "No encontrado";
        }
        return new TracingHistoryModel("", promotionType, isOutStock, isPromotion, isSale, price, decimalPrice, tracing.id, "", "","",0);

    }

    async scraping(tracing: TracingModel): Promise<TracingHistoryModel> {
        let client = new scrapingbee.ScrapingBeeClient('AO2U2FXKUEZK7SMNA1VDNNL2ACVTACIFIN59MN9BOVIDR5J9PAG4QUQLUDJZ52ZPW5BC1K0XKFAQO59C');
        let url = "https://www.alcampo.es/compra-online/search/?text=" + tracing.product.ean;
        console.log(tracing.searchType);
        if (tracing.searchType === 'EAN') {
            url = "https://www.alcampo.es/compra-online/search/?text=" + tracing.product.ean;
            let cookies = {
                "cp": tracing.PostalCode.code.toString(),
                "shopId": tracing.PostalCode.shopId,
            }
            let response = await scrapingBeeSearch(cookies, url);

            return this.scrapingByEAN(tracing, response);
        } else if (tracing.searchType === 'URL') {
            url = "https://www.alcampo.es/compra-online/search/?text=" + tracing.product.ean;
            let cookies = {
                "cp": tracing.PostalCode.code.toString(),
                "shopId": tracing.PostalCode.shopId,
            }
            let response = await scrapingBeeSearch(cookies, url);

            return this.scrapingByEAN(tracing, response);
        } else {
            throw 'error no URL ni EAN en Search type';
        }
    }

    scrapingBySearch(searchContent: any): Promise<any> {
        return Promise.resolve(undefined);
    }


    scrapingErrors(htmlContent: any): string {
        let fullContent = htmlContent.querySelectorAll(".price")[0];
        return fullContent.textContent
    }

    scrapingByUrl(url: any): Promise<any> {
        return Promise.resolve(undefined);
    }
}

interface IAlcampoService {
    scrapingByUrl(url: any): Promise<any>;

    scrapingBySearch(searchContent: any): Promise<any>;
}
