"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostalCodeModel = void 0;
class PostalCodeModel {
    constructor(address, name, code, shopId, createdAt) {
        this.address = address;
        this.name = name;
        this.code = code;
        this.shopId = shopId;
        this.createdAt = createdAt;
    }
    static fromDTO(dto) {
        return new PostalCodeModel(dto.address, dto.name, dto.code, dto.shop_id, dto.created_at);
    }
    static toDTO(postalCode) {
        return {
            name: postalCode.name,
            code: postalCode.code,
            address: postalCode.address,
            shop_id: postalCode.shopId,
            created_at: postalCode.createdAt
        };
    }
}
exports.PostalCodeModel = PostalCodeModel;
//# sourceMappingURL=postalCode.model.js.map