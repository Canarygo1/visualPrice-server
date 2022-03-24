import {IScrapingService} from "../utils/IScrapingService";
import {autoInjectable} from "tsyringe";
import {TracingModel} from "../models/tracing.model";
import {TracingHistoryModel} from "../models/tracingHistory.model";
import {alcampoParseCurrency, parseCurrency} from "../utils/parseCurrency";

const scrapingbee = require('scrapingbee');

const {JSDOM} = require("jsdom");

@autoInjectable()
export class ElCorteInglesService implements IScrapingService, IElCorteIngles {

    constructor() {
    }

    async scraping(tracing: TracingModel): Promise<TracingHistoryModel> {
        let client = new scrapingbee.ScrapingBeeClient('AO2U2FXKUEZK7SMNA1VDNNL2ACVTACIFIN59MN9BOVIDR5J9PAG4QUQLUDJZ52ZPW5BC1K0XKFAQO59C');
        let url = "https://www.elcorteingles.es/supermercado/buscar/?term=" + tracing.product.ean;
        let price = "";
        let decimalPrice: number = 0;
        let link = "";
        let promotionType = "";
        let isPromotion = false;
        let isOutStock = false;
        let saleType = "";
        let isSale = false;
        let response = await client.get({
            url: url,
            params: {
                wait: '2000',
                render_js: 'true',

            },
            cookies: {
                "cp_value": tracing.PostalCode.code.toString(),
            },
        });
        let decoder = new TextDecoder();
        let texto = decoder.decode(response.data);
        const dom = new JSDOM(texto);
        // console.log(texto);
        let prueba = dom.window.document.getElementsByClassName("grid-item");

        for (let i = 0; i < prueba.length; i++) {
            // try {
            let fullContent = prueba[i].querySelectorAll(".prices-price")[0];
            let outStock = prueba[i].querySelectorAll('._nostock')

            console.log(outStock.length);
            if (outStock.length > 0) {
                isOutStock = true;
            }

            price = fullContent.textContent;
            link = prueba[i].querySelectorAll("a")[0].getAttribute("href");
            console.log(link);
            console.log(price);
            try {
                saleType = prueba[i].querySelectorAll('[title="En oferta"]')[0].innerHTML;
                isSale = true;
                try {
                    price = prueba[i].querySelectorAll("._offer")[0].textContent;

                } catch (e) {
                    price = fullContent.textContent;
                }
            } catch (e) {
                saleType = "";
            }
            try {
                promotionType = prueba[i].querySelectorAll('.offer-description')[0].textContent;
                isPromotion = true;
            } catch (e) {
                isPromotion = false;
            }
        }
        if (price.length > 0) {
            decimalPrice = parseCurrency(price);
            tracing.url = link;
        } else {
            tracing.status = "No encontrado";
        }
        let tracingHistory: TracingHistoryModel = new TracingHistoryModel("", promotionType, isOutStock, isPromotion, isSale, price, decimalPrice, tracing.id, "", "","",0);
        return tracingHistory;
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

interface IElCorteIngles {
    scrapingByUrl(url: any): Promise<any>;

    scrapingBySearch(searchContent: any): Promise<any>;
}
