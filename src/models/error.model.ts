
export class ErrorTracingModel implements IErrorTracing{
    id:string
    type:string
    tracingId:string
    createdAt:string

    constructor(id:string, type: string, tracingId: string, createdAt: string,) {
        this.id = id;
        this.type = type;
        this.tracingId = tracingId;
        this.createdAt = createdAt;

    }

    static fromDTO(dto:IErrorTracingDTO):ErrorTracingModel{
        return new ErrorTracingModel(dto.id,dto.type,dto.tracing_id,dto.created_at)
    }

    toDTO():IErrorTracingDTO{
        return {
            id:this.id,
            type: this.type,
            tracing_id: this.tracingId,
            created_at: this.createdAt
        }
    }
}



export interface IErrorTracing {
    id:string,
    type:string,
    tracingId:string,
    createdAt:string
}

export interface IErrorTracingDTO {
    id:string,
    type:string,
    tracing_id:string,
    created_at:string
}
