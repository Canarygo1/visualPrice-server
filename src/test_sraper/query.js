const {createClient} = require("@supabase/supabase-js");
const SUPABASE_URL = "https://wvsedcttjognwkycbcsl.supabase.co"
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTIxMzM4NSwiZXhwIjoxOTU2Nzg5Mzg1fQ.IQosQcB77YhK1bc_bosvDWfci9o2S2ZZX81utfBFwr0'


async function query() {

    const client = createClient(SUPABASE_URL, SUPABASE_KEY)
    const postalCodeLP = "9c6796dd-4a0f-4603-a0a3-d0be851d6eab";
    const barcelonaCpAlcampo = "3ef8b210-864a-4086-801d-26ede654b6fb";
    const sevillaCpAlcampo = "c6484f90-9be6-45cb-81ba-fe3bc3923ad8";
    const valenciaCpAlcampo = "24e23090-0307-4334-a3b4-6e50aca01ead";
    const bilbaoCpAlcampo = "01eddec8-ab4f-4983-9bbe-19e4fe22d146";
    const vigoCpAlcampo = "bf223ba9-eb61-461d-9187-e40f24cca067";
    const madridCpAlcampo = "f4715457-4ea3-4904-9561-f300a354c6a0";

    const barcelonaCpCarrefour = "d6324a97-98aa-481d-bbb5-ac6742e42015";
    const sevillaCpCarrefour = "3a0ab9cc-8e2d-47e0-83ad-27903bc168f9";
    const valenciaCpCarrefour = "406aa4ca-4aea-4f0e-a43e-5c2cb3cf099f";
    const bilbaoCpCarrefour = "6e0b94fb-d149-4e3e-9489-174f46c1ee76";
    const vigoCpCarrefour = "8066e311-dbae-48ec-b2bf-35a9c1ad7af6";
    const madridCpCarrefour = "b4e95089-49b1-40e1-9320-8a413e646660";


    const barcelonaCpElCorteIngles = "2d86abc7-5c3c-47c2-b7f5-b5c7bd941b74";
    const sevillaCpElCorteIngles = "b55d7355-1088-4bf0-a9cd-32e2fadc12fb";
    const valenciaCpElCorteIngles = "83d50876-fc21-4e31-ba35-8d471fc084fe";
    const bilbaoCpElCorteIngles = "4d6f2bf3-8ca8-42dc-baae-dcf8b65b5686";
    const vigoCpElCorteIngles = "c7151422-f02e-4fd0-9275-2c71d82e9339";
    const madridCpElCorteIngles = "a3d1e5b5-1e4b-486e-84fe-35f319523eeb";




    const carrefour = "888dbb63-c33b-4044-a438-4d989bef7df7";
    const alcampo = "e92a1a4c-6e18-43ca-b750-ef7cb0e9f40c";
    const elcorteingles = "054bf7a3-bb75-49a8-a321-3ed0c36ceb52";
    let {data,error} = await client
        .from('Tracing')
        .select(`
                *,
                Distributor!inner(*),
                Postal_Code!inner(*),
                Client!inner(*)
              `).filter('Postal_Code.code','eq',28029)
                .filter('Distributor.name','eq','Alcampo')
                .filter('Client.name','eq','Arias')


    console.log(data.length);
    for (let i = 0;i<data.length;i++){
        const tracing = {
            product_id:data[i].product_id,
            distributor_id:alcampo,
            PostalCode_id:valenciaCpAlcampo,
            client_id:data[i].client_id
        }
        const response = await client
            .from('Tracing')
            .insert(tracing)
        console.log(response);
    }
}


query();
