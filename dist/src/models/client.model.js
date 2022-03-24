"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
class ClientModel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static fromDTO(dto) {
        if (dto === null) {
            return new ClientModel("", "");
        }
        return new ClientModel(dto.id, dto.name);
    }
    toDTO() {
        return {
            id: this.id,
            name: this.name
        };
    }
}
exports.ClientModel = ClientModel;
//# sourceMappingURL=client.model.js.map