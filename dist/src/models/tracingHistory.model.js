"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracingHistoryModel = void 0;
class TracingHistoryModel {
    constructor(id, PromotionType, isOutStock, isPromotion, isSale, price, decimalPrice, tracingId, saleType, createdAt, changeType, previousDecimalPrice) {
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
    static fromDTO(dto) {
        return new TracingHistoryModel(dto.id, dto.promotion_type, dto.is_out_stock, dto.is_promotion, dto.is_sale, dto.price, dto.decimal_price, dto.tracing_id, dto.sale_type, dto.created_at, dto.change_type, dto.previous_decimal_price);
    }
}
exports.TracingHistoryModel = TracingHistoryModel;
//# sourceMappingURL=tracingHistory.model.js.map