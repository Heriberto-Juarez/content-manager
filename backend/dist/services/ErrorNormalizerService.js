"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNormalizerService = void 0;
class ErrorNormalizerService {
    constructor(message, errors) {
        this.message = message;
        this.errors = errors;
    }
    buildErrors() {
        return {
            message: this.message,
            errors: this.errors || []
        };
    }
}
exports.ErrorNormalizerService = ErrorNormalizerService;
//# sourceMappingURL=ErrorNormalizerService.js.map