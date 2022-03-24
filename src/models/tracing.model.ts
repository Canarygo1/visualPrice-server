import {IProductDTO, ProductModel} from "./product.model";
import {DistributorModel, IDistributorDTO} from "./distributor.model";
import {IPostalCode, IPostalCodeDTO, PostalCodeModel} from "./postalCode.model";
import {ClientModel, IClientDTO} from "./client.model";

export class TracingModel implements ITracing{
    id: string;
    private _status: string;
    private _url: string;
    PostalCode: PostalCodeModel;
    distributor: DistributorModel;
    product: ProductModel;
    client:ClientModel;
    private _searchType:string;
    createdAt: string;
    updatedAt: string;
    private _hadChange:boolean = false;

    get hadChange(): boolean {
        return this._hadChange;
    }

    set hadChange(value: boolean) {
        this._hadChange = value;
    }

    constructor( id: string, status: string,  url: string, searchType:string,PostalCode: PostalCodeModel,  distributor: DistributorModel, product: ProductModel,client:ClientModel, createdAt: string, updatedAt: string) {
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
    static fromDTO (dto:ITracingDTO):TracingModel{
        let postalCode =  PostalCodeModel.fromDTO(dto.Postal_Code);
        let product = ProductModel.fromDTO(dto.Product);
        let distributor = DistributorModel.fromDTO(dto.Distributor);
        let client = ClientModel.fromDTO(dto.Client);

     return new TracingModel(dto.id,dto.status,dto.url,dto.search_type,postalCode,distributor,product, client,
         dto.createdAt,dto.updatedAt)
    }

    get status(): string {

        return this._status;
    }

    set status(value: string) {
        this.hadChange = true;
        this._status = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this.hadChange = true;
        this.status = 'Confirmado';
        this.searchType = 'URL'
        this._url = value;
    }

    get searchType(): string {
        return this._searchType;
    }

    set searchType(value: string) {
        this.hadChange = true;
        this._searchType = value;
    }
}

export interface ITracing {
    id:string,
    url:string,
    status:string,
    searchType:string,
    product:ProductModel,
    distributor:DistributorModel,
    PostalCode:PostalCodeModel,
    client:ClientModel,
    updatedAt:string,
    createdAt:string
}

export interface ITracingDTO {
    id:string,
    url:string,
    status:string,
    search_type:string,
    product_id:string,
    distributor_id:string,
    PostalCode_id:string,
    Product:IProductDTO,
    Distributor:IDistributorDTO,
    Postal_Code:IPostalCodeDTO,
    Client:IClientDTO,
    updatedAt:string,
    createdAt:string
}

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
