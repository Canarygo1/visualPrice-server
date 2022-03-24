"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
class ProductModel {
    constructor(id, name, ean, family, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.ean = ean;
        this.family = family;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromDTO(dto) {
        return new ProductModel(dto.id, dto.name, dto.ean, dto.family, dto.created_at, dto.updated_at);
    }
    toDTO() {
        return {
            id: this.id,
            name: this.name,
            ean: this.ean,
            family: this.family,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
}
exports.ProductModel = ProductModel;
//# sourceMappingURL=product.model.js.map