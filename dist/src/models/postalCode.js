"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostalCode = void 0;
class PostalCode {
    constructor(createdAt, logoUrl, name, webUrl) {
        this.logoUrl = logoUrl;
        this.name = name;
        this.webUrl = webUrl;
        this.createdAt = createdAt;
    }
    static fromDTO(dto) {
        return new PostalCode(dto.created_at, dto.logo_url, dto.name, dto.web_url);
    }
    static toDTO(distributor) {
        return {
            name: distributor.name,
            logo_url: distributor.logoUrl,
            web_url: distributor.webUrl,
            created_at: distributor.createdAt
        };
    }
}
exports.PostalCode = PostalCode;
//# sourceMappingURL=postalCode.js.map