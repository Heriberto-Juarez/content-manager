import { BaseError } from "./BaseError";

export class EUnauthorizedError extends BaseError {

    validationErrors : {[key: string]: string | null} = {};

    constructor(message? : string){
        message = message || 'Error de autorización'
        super(message)
        this.status = 401;
        this.message = message;
    }

   
}