
export class ProductModel implements IProduct{
    id:string;
    name:string;
    ean: string;
    family: string;
    createdAt: string;
    updatedAt: string;

    constructor(id: string, name: string, ean: string, family: string ,createdAt: string, updatedAt: string) {
        this.id = id;
        this.name = name;
        this.ean = ean;
        this.family = family;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromDTO(dto:IProductDTO):ProductModel{
        return new ProductModel(dto.id,dto.name,dto.ean,dto.family,dto.created_at,dto.updated_at)
    }
     toDTO():IProductDTO{
        return {
            id:this.id,
            name: this.name,
            ean: this.ean,
            family: this.family,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

}



export interface IProduct {
    id:string,
    name:string;
    ean: string;
    family: string;
    createdAt: string;
    updatedAt: string;
}

export interface IProductDTO {
    id:string,
    name:string;
    ean: string;
    family: string;
    updated_at: string;
    created_at:string
}
