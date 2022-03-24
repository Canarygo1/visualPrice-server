"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributorModel = void 0;
class DistributorModel {
    constructor(id, createdAt, logoUrl, name, webUrl) {
        this.id = id;
        this.logoUrl = logoUrl;
        this.name = name;
        this.webUrl = webUrl;
        this.createdAt = createdAt;
    }
    static fromDTO(dto) {
        return new DistributorModel(dto.id, dto.created_at, dto.logo_url, dto.name, dto.web_url);
    }
    toDTO() {
        return {
            id: this.id,
            name: this.name,
            logo_url: this.logoUrl,
            web_url: this.webUrl,
            created_at: this.createdAt
        };
    }
}
exports.DistributorModel = DistributorModel;
//# sourceMappingURL=distributor.model.js.map