
export class DistributorModel implements IDistributor{
    id:string;
    logoUrl: string;
    name: string;
    webUrl: string;
    createdAt: string;

    constructor(id:string, createdAt: string, logoUrl: string, name: string, webUrl: string) {
        this.id = id;
        this.logoUrl = logoUrl;
        this.name = name;
        this.webUrl = webUrl;
        this.createdAt = createdAt;

    }

      static fromDTO(dto:IDistributorDTO):DistributorModel{
        return new DistributorModel(dto.id,dto.created_at,dto.logo_url,dto.name,dto.web_url)
    }

       toDTO():IDistributorDTO{
        return {
            id:this.id,
            name: this.name,
            logo_url: this.logoUrl,
            web_url: this.webUrl,
            created_at: this.createdAt
        }
    }

}



export interface IDistributor {
    id:string,
    name:string,
    logoUrl:string,
    webUrl:string,
    createdAt:string
}

export interface IDistributorDTO {
    id:string,
    name:string,
    logo_url:string,
    web_url:string,
    created_at:string
}
