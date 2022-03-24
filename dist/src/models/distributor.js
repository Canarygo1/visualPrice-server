"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Distributor = void 0;
class Distributor {
    constructor(id, createdAt, logoUrl, name, webUrl) {
        this.id = id;
        this.logoUrl = logoUrl;
        this.name = name;
        this.webUrl = webUrl;
        this.createdAt = createdAt;
    }
    static fromDTO(dto) {
        return new Distributor(dto.id, dto.created_at, dto.logo_url, dto.name, dto.web_url);
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
exports.Distributor = Distributor;
//# sourceMappingURL=distributor.js.map