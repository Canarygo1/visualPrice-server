const {createClient} = require("@supabase/supabase-js");
const SUPABASE_URL = "https://wvsedcttjognwkycbcsl.supabase.co"
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTIxMzM4NSwiZXhwIjoxOTU2Nzg5Mzg1fQ.IQosQcB77YhK1bc_bosvDWfci9o2S2ZZX81utfBFwr0'


const getAllProductsCreatedToday = async () => {
    let startDate = new Date(2022,3,27);
    startDate.setHours(1, 0, 0, 0)
    let endDate = new Date(startDate.toUTCString());
    endDate.setDate(endDate.getDate() + 1);
    console.log(endDate);
    console.log(startDate);
    const client = createClient(SUPABASE_URL, SUPABASE_KEY)

    let {data, error} = await client
        .from('Product')
        .select(`
                *
              `).lt('created_at',endDate.toUTCString()).gt('created_at',startDate.toUTCString())
    console.log(data.length);

    return data
}

const init = async () => {
    const client = createClient(SUPABASE_URL, SUPABASE_KEY)
    const externaId = '7cf55d25-31da-46dd-8c91-e62578c431fb';
    const demoId = '445473f7-b8a3-4777-8dd0-befaa25153fe';
    //let {data} = await client.rpc('get_all_product_for_client')
    let data = await getAllProductsCreatedToday();

    for (let i = 0; i < data.length; i++) {
        let insertData = await client.from('ProductClient').insert({
            product_id: data[i].id,
            client_id: demoId
        })
        console.log(insertData);
    }
}

init()
