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
require("reflect-metadata");
const supabaseConnector_1 = require("./src/utils/supabaseConnector");
const tsyringe_1 = require("tsyringe");
const srapping_controller_1 = require("./src/controllers/srapping.controller");
const _ = require('lodash');
init();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let supabaseConnector = new supabaseConnector_1.SupabaseConnector().client;
        const originalConsoleError = console.error;
        console.error = function (msg) {
            if (_.startsWith(msg, 'Error: Could not parse CSS stylesheet'))
                return;
            originalConsoleError(msg);
        };
        const test = [];
        const scrapingController = tsyringe_1.container.resolve(srapping_controller_1.ScrappingController);
        scrapingController.init();
        // const distributorRepository = container.resolve(DistributorRepository);
        // let distributors = await distributorRepository.getAllDistributors();
        // console.log(distributors);
    });
}
//# sourceMappingURL=index.js.map