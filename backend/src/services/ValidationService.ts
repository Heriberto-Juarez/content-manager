import { StringSchema, ValidationError } from 'yup'
import { EValidationError } from '../errors/EValidationError';

export class ValidationService {

    validationErrors: { [key: string]: string | null } = {};

    validate(schemaItems: {
        schema: StringSchema
        value: any,
        key: string,
    }[]) {
        let isInvalid = false;
        schemaItems.forEach((item) => {
            try {
                item.schema.validateSync(item.value);
            } catch (e) {
                isInvalid = true;
                let errorMessage = 'Error de validación';
                if (e instanceof ValidationError) {
                    errorMessage = e.message;
                }
                this.validationErrors[item.key] = item.value;
            }
        })
        if (isInvalid) {
            const error = new EValidationError("Error de validación.");
            error.validationErrors = this.validationErrors;
            throw error;
        }
    }

}