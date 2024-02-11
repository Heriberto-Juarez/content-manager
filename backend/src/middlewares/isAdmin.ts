
import { Request, Response,NextFunction } from "express";
import { EUnauthorizedError } from "../errors/EUnauthorizedError";
import { JwtService } from "../services/JwtService";
import { UserTypeService } from "../services/UserTypeService";

export default function isAdmin(req : Request, res : Response, next : NextFunction){ 
    try{
        const jwtService = new JwtService();
        const userTypesService = new UserTypeService();

        let token = req.headers.authorization
        if (token && token.length > 0 && token.includes('Bearer')){
            token = token.split(' ')[1]
            const decoded = jwtService.decodeToken(token) as {role: string};
            if (userTypesService.isAdmin(`${decoded?.role}`)){
                next();
            }else{
                throw new EUnauthorizedError("Unauthorized. (Solo administradores)")
            }

        }else{
            throw new EUnauthorizedError("Unauthorized (No Token Found).")
        }
    }catch(e){
        throw new EUnauthorizedError("No se ha logrado validar su sesión.");
    }
}