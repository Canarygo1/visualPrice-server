import "reflect-metadata";
import {SupabaseConnector} from "./src/utils/supabaseConnector";
import {container} from "tsyringe";
import {ScrappingController} from "./src/controllers/srapping.controller";
const _ = require('lodash')

init()



async function init() {
    let supabaseConnector = new SupabaseConnector().client;
    const originalConsoleError = console.error
    console.error = function(msg) {
        if(_.startsWith(msg, 'Error: Could not parse CSS stylesheet')) return
        originalConsoleError(msg)
    }
    const test:object = [];
    const scrapingController = container.resolve(ScrappingController);
    scrapingController.init();
    // const distributorRepository = container.resolve(DistributorRepository);
    // let distributors = await distributorRepository.getAllDistributors();
    // console.log(distributors);
}

