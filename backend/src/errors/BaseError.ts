import { Response } from "express";
import { IError } from "../types/interfaces/IError";

export class BaseError extends Error {

    status : number = 500;
    errors: IError[] = [];

    constructor(message : string) {
        super(message)
    }

    /**
     * Se debe definir una subclase que implemente una forma de normalizar los errores en la estructura this.errors
     */
    serializeErrors(){
    }

    sendMessages(res : Response) {
        res.status(this.status).json({
            message: this.message,
            errors: this.errors,
        })
    }

}