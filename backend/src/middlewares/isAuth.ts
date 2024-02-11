
import { Request, Response,NextFunction } from "express";
import { EUnauthorizedError } from "../errors/EUnauthorizedError";
import { JwtService } from "../services/JwtService";

export default function isAuth(req : Request, res : Response, next : NextFunction){ 
    try{
        const jwtService = new JwtService();
        let token = req.headers.authorization
        if (token && token.length > 0 && token.includes('Bearer')){
            token = token.split(' ')[1]
            jwtService.verifyToken(token).then((valid)=>{
                if(valid){
                    next();
                }else{
                    res.status(401).json({message: 'Unauthorized (Su token no es valido o ha expirado)'})
                }
            })
        }else{
            res.status(401).json({message: 'Unauthorized (No tiene un token)'})
        }
    }catch(e){
        next(e)
    }
}