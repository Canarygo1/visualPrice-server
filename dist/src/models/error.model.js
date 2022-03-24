"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorTracingModel = void 0;
class ErrorTracingModel {
    constructor(id, type, tracingId, createdAt) {
        this.id = id;
        this.type = type;
        this.tracingId = tracingId;
        this.createdAt = createdAt;
    }
    static fromDTO(dto) {
        return new ErrorTracingModel(dto.id, dto.type, dto.tracing_id, dto.created_at);
    }
    toDTO() {
        return {
            id: this.id,
            type: this.type,
            tracing_id: this.tracingId,
            created_at: this.createdAt
        };
    }
}
exports.ErrorTracingModel = ErrorTracingModel;
//# sourceMappingURL=error.model.js.map