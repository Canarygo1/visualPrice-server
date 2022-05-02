const {createClient} = require("@supabase/supabase-js");
const SUPABASE_URL = "https://wvsedcttjognwkycbcsl.supabase.co"
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTIxMzM4NSwiZXhwIjoxOTU2Nzg5Mzg1fQ.IQosQcB77YhK1bc_bosvDWfci9o2S2ZZX81utfBFwr0'

const prueba = async () => {
    const client = createClient(SUPABASE_URL, SUPABASE_KEY)

    let {data} = await client
        .from('tracing_history')
        .select(`
                *,
                Tracing(*,
                Postal_Code(*),
                Distributor(*),
                Client!inner(*),
                Product(*)
                )
              `).filter("Tracing.client_id", "eq", clientId).filter("Tracing.Postal_Code.code", "eq", cp);

    console.log(data);


}
const testQuery = async ()=>{
    const client = createClient(SUPABASE_URL, SUPABASE_KEY)
    const { user, error } = await client.auth.signUp({
        email: 'demo@visualprice.com',
        password: 'demo2022',
    });
    // const { user, error } = await client.auth.signIn({
    //     email: 'contacto@visualprice.com',
    //     password: 'tenerife99',
    // });
    console.log(user.id);
    let {data} = await client
        .from('user')
        .select(`
                *
                )
              `).eq("id", user.id);
    console.log(data);
}
testQuery()
async function getProductByEan(eanCode = "", distributors = [], cps = []) {
    const client = createClient(SUPABASE_URL, SUPABASE_KEY)

    let {data, error} = await client
        .rpc("get_tracing_history_by_ean2", {
            distributors: distributors,
            postal_codes: cps,
            ean_input: eanCode
        });
    console.log(data)

}

// getProductByEan('8414516078354',['Alcampo'],[38001]);


