import { BaseError } from "./BaseError";

export class EValidationError extends BaseError {

    validationErrors : {[key: string]: string | null} = {};
    

    constructor(message? : string){
        message = message || 'Error de validación'
        super(message)
        this.status = 400;
        this.message = message;
    }

    serializeErrors(): void {
        // Normalizar errores para verse como en la clase base.
        Object.keys(this.validationErrors).forEach((key)=>{
            const error = this.validationErrors[key];
            this.errors.push({
                field: key,
                message: error || 'Error desconocido',
            })
        })
    }
}