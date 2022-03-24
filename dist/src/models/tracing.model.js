"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracingModel = void 0;
const product_model_1 = require("./product.model");
const distributor_model_1 = require("./distributor.model");
const postalCode_model_1 = require("./postalCode.model");
const client_model_1 = require("./client.model");
class TracingModel {
    constructor(id, status, url, searchType, PostalCode, distributor, product, client, createdAt, updatedAt) {
        this._hadChange = false;
        this.id = id;
        this._status = status;
        this._url = url;
        this._searchType = searchType;
        this.PostalCode = PostalCode;
        this.distributor = distributor;
        this.client = client;
        this.product = product;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    get hadChange() {
        return this._hadChange;
    }
    set hadChange(value) {
        this._hadChange = value;
    }
    static fromDTO(dto) {
        let postalCode = postalCode_model_1.PostalCodeModel.fromDTO(dto.Postal_Code);
        let product = product_model_1.ProductModel.fromDTO(dto.Product);
        let distributor = distributor_model_1.DistributorModel.fromDTO(dto.Distributor);
        let client = client_model_1.ClientModel.fromDTO(dto.Client);
        return new TracingModel(dto.id, dto.status, dto.url, dto.search_type, postalCode, distributor, product, client, dto.createdAt, dto.updatedAt);
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this.hadChange = true;
        this._status = value;
    }
    get url() {
        return this._url;
    }
    set url(value) {
        this.hadChange = true;
        this.status = 'Confirmado';
        this.searchType = 'URL';
        this._url = value;
    }
    get searchType() {
        return this._searchType;
    }
    set searchType(value) {
        this.hadChange = true;
        this._searchType = value;
    }
}
exports.TracingModel = TracingModel;
// {
//     id: 'defea7c4-e88d-44bb-be4b-bd0f6f781588',
//     status: 'Revision',
//     created_at: '2022-01-17T11:55:14+00:00',
//     updated_at: '11:55:14+00',
//     url: null,
//     search_type: 'EAN',
//     distributor_id: 'e92a1a4c-6e18-43ca-b750-ef7cb0e9f40c',
//     PostalCode_id: '94b5344d-855e-4145-bd8d-ac6b403741ed',
//     product_id: '657f4ab3-b091-4cb0-8830-a1f28c10f3a9',
//     Distributor: {
//       id: 'e92a1a4c-6e18-43ca-b750-ef7cb0e9f40c',
//       name: 'Alcampo',
//       logo_url: null,
//       web_url: 'https://www.Alcampo.es',
//       created_at: '2022-01-14T10:33:43+00:00'
//     },
//     Postal_Code: {
//       id: '94b5344d-855e-4145-bd8d-ac6b403741ed',
//       Code: 38001,
//       Address: 'Santa Cruz de Tenerife',
//       created_at: '2022-01-14T11:17:12+00:00',
//       name: 'Alcampo La laguna Tenerife'
//     },
//     Product: {
//       id: '657f4ab3-b091-4cb0-8830-a1f28c10f3a9',
//       name: 'SOLAN CABRA AGUA MINERAL NATURA PET 1,5L',
//       ean: '8411547001085',
//       family: 'AGUAS',
//       created_at: '2022-01-17T11:50:27+00:00',
//       updated_at: '2022-01-17T11:50:27',
//       brand: 'SOLAN DE CABRAS'
//     }
//   }
//# sourceMappingURL=tracing.model.js.map