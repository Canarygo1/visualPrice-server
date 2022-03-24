import {IScrapingService} from "../utils/IScrapingService";
import {autoInjectable} from "tsyringe";
import {TracingModel} from "../models/tracing.model";
import {TracingHistoryModel} from "../models/tracingHistory.model";
import {alcampoParseCurrency, parseCurrency} from "../utils/parseCurrency";

const scrapingbee = require('scrapingbee');

const {JSDOM} = require("jsdom");

@autoInjectable()
export class CarrefourService implements IScrapingService, ICarrefourService {//

    constructor() {
    }

    async scraping(tracing: TracingModel): Promise<TracingHistoryModel> {
        let client = new scrapingbee.ScrapingBeeClient('AO2U2FXKUEZK7SMNA1VDNNL2ACVTACIFIN59MN9BOVIDR5J9PAG4QUQLUDJZ52ZPW5BC1K0XKFAQO59C');
        console.log(tracing.product.ean);
        console.log(tracing.product.name);
        let url = "https://www.carrefour.es/?q=" + tracing.product.ean;
        let price = "";
        let decimalPrice: number = 0;
        let link = "";
        let promotionType = "";
        let isPromotion = false;
        let isSale = false;
        let isOutStock = false;
        let response = await client.get({
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


        let prueba = await dom.window.document.getElementsByClassName("ebx-result__wrapper")
        let noResults = await dom.window.document.getElementsByClassName("ebx-no-results")

        if (prueba.length === 0 && noResults.length === 0){
            throw 'Resource not loaded'
        }

        if (noResults.length>0){
            isOutStock = true;
            console.log(isOutStock)
        }

        if (noResults.length===0) {
            for (let i = 0; i < prueba.length; i++) {
                price = prueba[i].querySelectorAll(".ebx-result-price__value")[0].textContent;
                try {
                    promotionType = prueba[i].querySelectorAll(".ebx-result__banner")[0].textContent;
                    promotionType = prueba[i].querySelectorAll(".ebx-result__banner")[0].textContent;
                    if (promotionType !== undefined) {
                        isPromotion = true;
                    }
                } catch (e) {
                    promotionType = "";
                }
                try {
                    promotionType = prueba[i].querySelectorAll(".ebx-result-price__original-value")[0].textContent;
                    isSale = true;
                } catch (e) {
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
            decimalPrice = parseCurrency(price);
        }

        return new TracingHistoryModel("", promotionType, isOutStock, isPromotion, isSale, price, decimalPrice, tracing.id, "", "","",0);
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

interface ICarrefourService {
    scrapingByUrl(url: any): Promise<any>;

    scrapingBySearch(searchContent: any): Promise<any>;
}
