
export class ClientModel implements IClient{
    id:string;

    name: string;

    constructor(id:string, name: string ) {
        this.id = id;
        this.name = name;


    }

    static fromDTO(dto:IClientDTO):ClientModel{
        if (dto === null){
            return new ClientModel("","");
        }
        return new ClientModel(dto.id,dto.name)
    }
    toDTO():IClientDTO{
        return {
            id:this.id,
            name: this.name
        }
    }

}



export interface IClient {
    id:string,
    name:string,

}

export interface IClientDTO {
    id:string,
    name:string,

}
