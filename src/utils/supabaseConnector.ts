import {createClient, SupabaseClient} from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const SUPABASE_URL = "https://wvsedcttjognwkycbcsl.supabase.co"
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTIxMzM4NSwiZXhwIjoxOTU2Nzg5Mzg1fQ.IQosQcB77YhK1bc_bosvDWfci9o2S2ZZX81utfBFwr0'

export class SupabaseConnector {
    private readonly _client: SupabaseClient
    constructor() {
        this._client = createClient(SUPABASE_URL, SUPABASE_KEY)
    }

    get client(): SupabaseClient {
        return this._client;
    }

}
