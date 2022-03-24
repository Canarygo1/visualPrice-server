
export class PostalCodeModel implements IPostalCode{
    name:string;
    address:string;
    code:string;
    shopId:string;
    createdAt: string;

    constructor( address: string, name: string, code: string,shopId:string,createdAt: string,) {
        this.address = address;
        this.name = name;
        this.code = code;
        this.shopId = shopId;
        this.createdAt = createdAt;
    }

    static fromDTO(dto:IPostalCodeDTO):PostalCodeModel{
        return new PostalCodeModel(dto.address,dto.name,dto.code,dto.shop_id,dto.created_at)
    }
    static toDTO(postalCode:PostalCodeModel):IPostalCodeDTO{
        return {
            name: postalCode.name,
            code: postalCode.code,
            address: postalCode.address,
            shop_id:postalCode.shopId,
            created_at: postalCode.createdAt
        }
    }

}



export interface IPostalCode {
    name:string,
    address:string,
    code:string,
    shopId:string,
    createdAt:string
}

export interface IPostalCodeDTO {
    name:string,
    address:string,
    code:string,
    shop_id:string,
    created_at:string

}
