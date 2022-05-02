const fs = require('fs').promises;
const parse =  require('csv-parse');
const {createClient} = require("@supabase/supabase-js");
const SUPABASE_URL = "https://wvsedcttjognwkycbcsl.supabase.co"
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTIxMzM4NSwiZXhwIjoxOTU2Nzg5Mzg1fQ.IQosQcB77YhK1bc_bosvDWfci9o2S2ZZX81utfBFwr0'

loadProducts = async () => {
    const client = createClient(SUPABASE_URL, SUPABASE_KEY);
    const products = [];
    const fileContent = await fs.readFile('referencias.csv');
    const records = await new Promise((resolve,reject)=>
    {parse.parse(fileContent, {
        delimiter:';',
        columns:true
        }, (error, result) => {
        if (error) {
            console.error(error);
        }
        resolve(result)

    });});
    console.log(records[0]);
    for (let i =0;i<records.length;i++){
        const product = {
            name:records[i].Referencia,
            ean:records[i].EAN,
            family:records[i].Familia,
            brand:records[i].Fabricante,
        }
        console.log(product);
        const {data, error} = await client.from('Product').insert(product);
    }
}
loadProducts()
