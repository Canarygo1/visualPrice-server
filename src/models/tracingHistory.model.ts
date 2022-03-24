
export class TracingHistoryModel implements ITracingHistory{
    id: string;
    PromotionType: string;
    isOutStock: boolean;
    isPromotion: boolean;
    isSale: boolean;
    price: string;
    changeType:string;
    previousDecimalPrice:number;
    decimalPrice: number;
    saleType: string;
    tracingId:string;
    createdAt: string;

    constructor( id: string, PromotionType: string, isOutStock: boolean, isPromotion: boolean, isSale: boolean, price: string, decimalPrice:number
                 ,tracingId:any,saleType: string,createdAt: string,changeType:string,previousDecimalPrice:number) {
        this.id = id;
        this.PromotionType = PromotionType;
        this.isOutStock = isOutStock;
        this.isPromotion = isPromotion;
        this.changeType = changeType;
        this.isSale = isSale;
        this.price = price;
        this.decimalPrice = decimalPrice;
        this.saleType = saleType;
        this.tracingId = tracingId;
        this.createdAt = createdAt;
        this.previousDecimalPrice = previousDecimalPrice;
    }
    static fromDTO(dto:ITracingDTO){
        return new TracingHistoryModel(dto.id,
            dto.promotion_type,
            dto.is_out_stock,
            dto.is_promotion,
            dto.is_sale,
            dto.price,
            dto.decimal_price,
            dto.tracing_id,
            dto.sale_type
            ,dto.created_at,
            dto.change_type,
            dto.previous_decimal_price)
    }


}

interface ITracingHistory{
    id:string,
    isPromotion:boolean,
    isOutStock:boolean,
    isSale:boolean,
    PromotionType:string,
    saleType:string,
    decimalPrice:number,
    changeType:string,
    price:string,
    previousDecimalPrice:number,
    tracingId:string,
    createdAt:string
}

export interface ITracingDTO {
    id:string,
    is_promotion:boolean,
    is_out_stock:boolean,
    is_sale:boolean,
    change_type:string,
    promotion_type:string,
    sale_type:string,
    tracing_id:string;
    previous_decimal_price:number,

    decimal_price:number;
    price:string,
    created_at:string
}
