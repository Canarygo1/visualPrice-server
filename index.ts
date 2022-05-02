import "reflect-metadata";
import {SupabaseConnector} from "./src/utils/supabaseConnector";
import {container} from "tsyringe";
import {ScrappingController} from "./src/controllers/srapping.controller";
const _ = require('lodash')
const express = require('express')
const app = express()
const port = 3300
const cron = require('node-cron');

async function init() {
    let supabaseConnector = new SupabaseConnector().client;
    const originalConsoleError = console.error
    console.error = function(msg) {
        if(_.startsWith(msg, 'Error: Could not parse CSS stylesheet')) return
        originalConsoleError(msg)
    }
    const test:object = [];
    const scrapingController = container.resolve(ScrappingController);
    console.log("TESTEANDO")
    scrapingController.init();
    // const distributorRepository = container.resolve(DistributorRepository);
    // let distributors = await distributorRepository.getAllDistributors();
    // console.log(distributors);
}


app.get('/', (req:any, res:any) => {
    res.send('Hello World!')
})
// cron.schedule('38 09 * * *', function() {
//     console.log('hola')
//     init()
//
// },{
//     scheduled: true,
//     timezone: "Atlantic/Canary"
// });
app.listen(port, () => {
         init()

    console.log(`Example app listening on port ${port}`)
})
