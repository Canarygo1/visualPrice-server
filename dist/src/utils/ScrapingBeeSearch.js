"use strict";
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
exports.scrapingBeeSearch = void 0;
const scrapingbee = require('scrapingbee');
function scrapingBeeSearch(cookies, url) {
    return __awaiter(this, void 0, void 0, function* () {
        let client = new scrapingbee.ScrapingBeeClient('AO2U2FXKUEZK7SMNA1VDNNL2ACVTACIFIN59MN9BOVIDR5J9PAG4QUQLUDJZ52ZPW5BC1K0XKFAQO59C');
        let response = yield client.get({
            url: url,
            params: {
                timeout: '10000',
                wait: '1000',
            },
            cookies: cookies,
        });
        return response;
    });
}
exports.scrapingBeeSearch = scrapingBeeSearch;
//# sourceMappingURL=ScrapingBeeSearch.js.map