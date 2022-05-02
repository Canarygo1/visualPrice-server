const {createClient} = require("@supabase/supabase-js");
const SUPABASE_URL = "https://wvsedcttjognwkycbcsl.supabase.co"
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTIxMzM4NSwiZXhwIjoxOTU2Nzg5Mzg1fQ.IQosQcB77YhK1bc_bosvDWfci9o2S2ZZX81utfBFwr0'
const client = createClient(SUPABASE_URL, SUPABASE_KEY)



const getAllProductsCreatedToday = async () => {
    let startDate = new Date(Date.now());
    startDate.setHours(1,0,0,0)
    let endDate = new Date(startDate.toUTCString());
    endDate.setDate(endDate.getDate()+1);
    console.log(endDate);
    console.log(startDate);

    let {data, error} = await client
        .from('Product')
        .select(`
                *
              `).lt('created_at',endDate.toUTCString())
        .gt('created_at',startDate.toUTCString())
    console.log(data.length);

}

