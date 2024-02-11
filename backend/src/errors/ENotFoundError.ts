import { BaseError } from "./BaseError";

export class ENotFoundError extends BaseError {

    validationErrors : {[key: string]: string | null} = {};

    constructor(message? : string){
        message = message || 'Recurso no encontrado'
        super(message)
        this.status = 404;
        this.message = message;
    }

    
   
}