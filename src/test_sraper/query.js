const {createClient} = require("@supabase/supabase-js");
const SUPABASE_URL = "https://wvsedcttjognwkycbcsl.supabase.co"
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTIxMzM4NSwiZXhwIjoxOTU2Nzg5Mzg1fQ.IQosQcB77YhK1bc_bosvDWfci9o2S2ZZX81utfBFwr0'
 const getAllProductsCreatedToday = async () => {
     const client = createClient(SUPABASE_URL, SUPABASE_KEY)
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
    return data;

}


async function query() {

    const client = createClient(SUPABASE_URL, SUPABASE_KEY)
    const postalCodeLP = "9c6796dd-4a0f-4603-a0a3-d0be851d6eab";
    const barcelonaCpAlcampo = "3ef8b210-864a-4086-801d-26ede654b6fb";
    const sevillaCpAlcampo = "c6484f90-9be6-45cb-81ba-fe3bc3923ad8";
    const valenciaCpAlcampo = "24e23090-0307-4334-a3b4-6e50aca01ead";
    const bilbaoCpAlcampo = "01eddec8-ab4f-4983-9bbe-19e4fe22d146";
    const vigoCpAlcampo = "bf223ba9-eb61-461d-9187-e40f24cca067";
    const madridCpAlcampo = "f4715457-4ea3-4904-9561-f300a354c6a0";
    const tenerifeCpAlcampo = '94b5344d-855e-4145-bd8d-ac6b403741ed';
    const lasPalmasCpAlcampo = '1ecdba02-6c73-479a-978b-f91d9cfc9401';

    const barcelonaCpCarrefour = "d6324a97-98aa-481d-bbb5-ac6742e42015";
    const sevillaCpCarrefour = "3a0ab9cc-8e2d-47e0-83ad-27903bc168f9";
    const valenciaCpCarrefour = "406aa4ca-4aea-4f0e-a43e-5c2cb3cf099f";
    const bilbaoCpCarrefour = "6e0b94fb-d149-4e3e-9489-174f46c1ee76";
    const vigoCpCarrefour = "8066e311-dbae-48ec-b2bf-35a9c1ad7af6";
    const madridCpCarrefour = "b4e95089-49b1-40e1-9320-8a413e646660";
    const tenerifeCpCarrefour = '4b2b02eb-707f-4512-80ef-14e260477977';
    const lasPalmasCpCarrefour = '3c02d96d-0373-4dc3-93b2-dca055d66af8';

    const barcelonaCpElCorteIngles = "2d86abc7-5c3c-47c2-b7f5-b5c7bd941b74";
    const sevillaCpElCorteIngles = "b55d7355-1088-4bf0-a9cd-32e2fadc12fb";
    const valenciaCpElCorteIngles = "83d50876-fc21-4e31-ba35-8d471fc084fe";
    const bilbaoCpElCorteIngles = "4d6f2bf3-8ca8-42dc-baae-dcf8b65b5686";
    const vigoCpElCorteIngles = "c7151422-f02e-4fd0-9275-2c71d82e9339";
    const madridCpElCorteIngles = "a3d1e5b5-1e4b-486e-84fe-35f319523eeb";
    const tenerifeCpElCorteIngles = '222d4f83-ec6f-45f5-b835-26893c330153';
    const lasPalmasCpElCorteIngles = '1d4850e5-59c9-4cd9-b656-f7a57a64787b';

    const carrefour = "888dbb63-c33b-4044-a438-4d989bef7df7";
    const alcampo = "e92a1a4c-6e18-43ca-b750-ef7cb0e9f40c";
    const elcorteingles = "054bf7a3-bb75-49a8-a321-3ed0c36ceb52";

    const cliendId = '7cf55d25-31da-46dd-8c91-e62578c431fb';
    const data = await getAllProductsCreatedToday();
    // let {data,error} = await client
    //     .from('Tracing')
    //     .select(`
    //             *,
    //             Distributor!inner(*),
    //             Postal_Code!inner(*),
    //             Client!inner(*)
    //           `).filter('Postal_Code.code','eq',8001)
    //             .filter('Distributor.name','eq','Alcampo')
    //             .filter('Client.name','eq','Arias')

    const frieslandId = 'ecf177cf-737e-40ee-9436-b4116a2d38d2';
    const ariasId = 'e993e829-6c28-46e9-a6c4-0a5a6fc737f2';

    for (let i = 0;i<data.length;i++){
        const tracing = {
            product_id:data[i].id,
            distributor_id:elcorteingles,
            PostalCode_id:tenerifeCpElCorteIngles,
            client_id:frieslandId
        }
        const response = await client
            .from('Tracing')
            .insert(tracing)
        console.log(response);
    }
}


query();
