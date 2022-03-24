const scrapingbee = require('scrapingbee');

export async function scrapingBeeSearch(cookies: object,url:string) {
    let client = new scrapingbee.ScrapingBeeClient('AO2U2FXKUEZK7SMNA1VDNNL2ACVTACIFIN59MN9BOVIDR5J9PAG4QUQLUDJZ52ZPW5BC1K0XKFAQO59C');
    let response = await client.get({
        url: url,
        params: {
            timeout:'10000',
            wait: '1000',
        },
        cookies: cookies,
    });

    return response;
}
