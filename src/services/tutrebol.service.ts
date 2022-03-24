import {IScrapingService} from "../utils/IScrapingService";
import {autoInjectable} from "tsyringe";
import {TracingModel} from "../models/tracing.model";
import {TracingHistoryModel} from "../models/tracingHistory.model";
import {alcampoParseCurrency} from "../utils/parseCurrency";

const scrapingbee = require('scrapingbee');

const {JSDOM} = require("jsdom");

@autoInjectable()
export class TuTrebolService implements IScrapingService, ITuTrebolService {

    constructor() {
    }

    async scraping(tracing: TracingModel): Promise<TracingHistoryModel> {
        let client = new scrapingbee.ScrapingBeeClient('AO2U2FXKUEZK7SMNA1VDNNL2ACVTACIFIN59MN9BOVIDR5J9PAG4QUQLUDJZ52ZPW5BC1K0XKFAQO59C');
        let url = "https://www.tutrebol.es/buscar?controller=search&orderby=position&orderway=desc&listadoCompra=1&search_query="+tracing.product.ean;
        let price = "";
        let decimalPrice:number = 0;
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
            try{
                link = await prueba[i].querySelectorAll("a")[0].getAttribute("href");
                console.log(link);
            }catch (e) {

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
        if (price.length>0){
            decimalPrice = alcampoParseCurrency(price);
            tracing.url = link;
        }
        let tracingHistory: TracingHistoryModel = new TracingHistoryModel("", promotionType, false, isPromotion, isSale, price,decimalPrice, tracing.id, "", "","",0);

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

interface ITuTrebolService {
    scrapingByUrl(url: any): Promise<any>;

    scrapingBySearch(searchContent: any): Promise<any>;
}
