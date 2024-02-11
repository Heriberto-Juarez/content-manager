"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const yup_1 = require("yup");
class ValidationService {
    constructor() {
        this.errors = {};
    }
    validate(schemaItems) {
        let isInvalid = false;
        schemaItems.forEach((item) => {
            try {
                item.schema.validateSync(item.value);
            }
            catch (e) {
                isInvalid = true;
                let errorMessage = 'Error de validación';
                if (e instanceof yup_1.ValidationError) {
                    errorMessage = e.message;
                }
                this.errors[item.key] = item.value;
            }
        });
        if (isInvalid) {
            throw new yup_1.ValidationError("Error de validación.");
        }
    }
}
exports.ValidationService = ValidationService;
//# sourceMappingURL=ValidationService.js.map