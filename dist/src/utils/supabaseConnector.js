"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseConnector = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
// Create a single supabase client for interacting with your database
const SUPABASE_URL = "https://wvsedcttjognwkycbcsl.supabase.co";
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTIxMzM4NSwiZXhwIjoxOTU2Nzg5Mzg1fQ.IQosQcB77YhK1bc_bosvDWfci9o2S2ZZX81utfBFwr0';
class SupabaseConnector {
    constructor() {
        this._client = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
    }
    get client() {
        return this._client;
    }
}
exports.SupabaseConnector = SupabaseConnector;
//# sourceMappingURL=supabaseConnector.js.map