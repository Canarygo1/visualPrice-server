const {createClient} = require("@supabase/supabase-js");
const SUPABASE_URL = "https://wvsedcttjognwkycbcsl.supabase.co"
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTIxMzM4NSwiZXhwIjoxOTU2Nzg5Mzg1fQ.IQosQcB77YhK1bc_bosvDWfci9o2S2ZZX81utfBFwr0'

const parseCurrencyAlcampo = async()=>{
    const client = createClient(SUPABASE_URL, SUPABASE_KEY)
    let {data,error} = await client
        .from('tracing_history')
        .select(`
                *,
                Tracing!inner(*)
              `)
        .filter('Tracing.distributor_id', 'eq', 'e92a1a4c-6e18-43ca-b750-ef7cb0e9f40c')
    for (let i = 0;i<data.length;i++){
        if (data[i].price.length >= 9 ){
            let parse =  parseFloat(data[i].price.substring(1,6).replace(',','.'));
            const { error } = await client
                .from('tracing_history')
                .update({ decimal_price: parse })
                .match({ id:data[i].id })
            console.log(parse);
        }
        else if(data[i].price.length === 8 ){
            let parse =  parseFloat(data[i].price.substring(1,5).replace(',','.'));
            const {error } = await client
                .from('tracing_history')
                .update({ decimal_price: parse })
                .match({ id:data[i].id })
            console.log(parse);
        }
        else{
            console.log("vacio")
        }
    }
}
const parseCurrencyCarrefourAndElCorteIngles = async()=>{
    const client = createClient(SUPABASE_URL, SUPABASE_KEY)
    let {data,error} = await client
        .from('tracing_history')
        .select(`
                *,
                Tracing!inner(*)
              `)
        .filter('Tracing.distributor_id', 'eq', '054bf7a3-bb75-49a8-a321-3ed0c36ceb52')
    console.log(data.length);
    for (let i = 0;i<data.length;i++){
        if (data[i].price.length>0){
            let priceToFloat = parseFloat(data[i].price.substring(0,data[i].price.length-2).replace(',','.'));
            const { error } = await client
                .from('tracing_history')
                .update({ decimal_price: priceToFloat })
                .match({ id:data[i].id })
            console.log(priceToFloat);
        }
    }
}
parseCurrencyCarrefourAndElCorteIngles();
