const http = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const cheerio = require('cheerio');
const csv = require('csv-parser');
const fs = require('fs');
const axios = require("axios");

// const options = {
//     "method": "GET",
//     "hostname": "api.webscrapingapi.com",
//     "port": null,
//     "path": "/v1?api_key=oz4AUPDbNFiQSETTyxt6gHlyrEAkm260&url=" + "https://www.carrefour.es/supermercado/cerveza-ambar-indian-pale-ale-botella-33-cl/R-prod740068/p" + "&method=GET&render_js=1&keep_headers=1&device=desktop&proxy_type=datacenter&country=es&wait_until=domcontentloaded",
//     "headers": {
//         "Accept": "application/json",
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.37",
//         "Cookie": "salepoint:005290||38530|A_DOMICILIO"
//     }
// };
//
//
//
// const req = http.request(options, function (res) {
//     const chunks = [];
//     res.on("data", function (chunk) {
//         chunks.push(chunk);
//     });
//
//     res.on("end", function () {
//         const body = Buffer.concat(chunks);
//
//         const $ = cheerio.load(body.toString());
//
//         console.log(body.toString());
//
//     });
// });
//
// req.end();

const readFile =  () => {
    let data = [];
     fs.createReadStream('pricing_reducido.csv',)
        .pipe(csv({separator: ";"}))
        .on('data', async (row) => {
            data.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            runAllElements(data)
        });
}

const urlToAlcampoScrap = async (url) => {
    let datetest = "https://api.webscrapingapi.com/v1?api_key=oz4AUPDbNFiQSETTyxt6gHlyrEAkm260&url="+url+"&method=GET&render_js=1&keep_headers=1&device=mobile&proxy_type=datacenter&country=es&wait_until=domcontentloaded&timeout=20000"
    let data = await axios.get(
        "https://api.webscrapingapi.com/v1?api_key=oz4AUPDbNFiQSETTyxt6gHlyrEAkm260&url="+url+"&method=GET&render_js=1&keep_headers=1&device=mobile&proxy_type=datacenter&wait_until=domcontentloaded&timeout=20000"
        ,{
            timeout:120000,
            headers:{
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
            "cookie": "shopId=019; cp=38205; cookieLanguageHybris:es; deliveryMode:PICKUP_DELIVERY_MODE",

        }
    })
        const $ = cheerio.load(data.data);

        const mango = $(".big-price");
        console.log(mango.text());
}


const urlToCarrefourScrap = async (url) => {

    let config = {
        method: 'get',
        url:"https://api.webscrapingapi.com/v1?api_key=oz4AUPDbNFiQSETTyxt6gHlyrEAkm260&url="+url+"&method=GET&keep_headers=1&device=desktop&proxy_type=datacenter&timeout=20000"
        ,
        headers: {
            'cookie': 'salepoint=005211|4600015||DRIVE; '
        }
    };
    let data = await axios(config);

    const $ = cheerio.load(data.data);

    const mango = $(".buybox__price");
    // console.log(data.data);
    const head = $('link[rel="canonical"]');
    const urlFromRequest= head.attr('href')

    if (url !==urlFromRequest){
         await urlToCarrefourScrap(urlFromRequest);
    }else{
        console.log(mango.text());
    }

}


const runAllElements = async (elements) => {
    let path =
        "https://www.alcampo.es%2Fcompra-online%2Fbebidas%2Fcervezas%2Fpremium%2Fpremium-rubia%2Fambar-ipa-cerveza-premium-33-cl%2Fp%2F710127";

    for (let i = 0; i <elements.length; i++) {
        console.log(elements[i]["PRODUCTO"])
        if (elements[i]["Alcampo TF"] !== undefined) {
            try {
                console.log("ALCAMPO TF PRECIO")
                await urlToAlcampoScrap(elements[i]["Alcampo TF"])
            }catch (e){
                console.log(e);
                console.log("ERROR ALCAMPO")
            }

        }
        if (elements[i]["Carrefour TF"] !== undefined && elements[i]["Carrefour TF"] !== "") {
            try {
                console.log("Carrefour TF PRECIO")
                await urlToCarrefourScrap(elements[i]["Carrefour TF"])
            }catch (e){
                console.log("Error CArrefour "+ elements[i]["Carrefour TF"])
                console.log(e);
            }
        }
    }
}


readFile();
