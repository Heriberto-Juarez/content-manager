import { Request, Response, NextFunction } from 'express'
import { BaseError } from '../errors/BaseError';

const errorHandler = (err: Error | BaseError, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof BaseError){
        err.serializeErrors();
        err.sendMessages(res);
    }else {
        res.status(500).json({
            message: err?.message || 'Error de servidor'
        });
    }
    next(err);
};

export default errorHandler;
