import { Request, Response } from "express";
import { ContentRepository } from "../repositories/content.repository";
import { UploadService } from "../services/UploadService";
import { EValidationError } from "../errors/EValidationError";
import { JwtService } from "../services/JwtService";
import { UserRepository } from "../repositories/user.repository";

export class ContentController {

    uploadSubdirectory = 'content'
    repository = new ContentRepository();
    uploadService = new UploadService();
    jwtService = new JwtService();
    userRepo = new UserRepository();

    constructor() {
        this.list = this.list.bind(this)
        this.create = this.create.bind(this)
    }

    async getUserId(req : Request){
        // Colocar en una mejor ubicación para mejor reutilización.
        let userId = '';
        let token = req.headers.authorization
        if (token && token.length > 0 && token.includes('Bearer')){
            token = token.split(' ')[1]
            const decoded = this.jwtService.decodeToken(token) as {username: string};
            const user = await this.userRepo.getByUsername(decoded.username);
            if (!user) {
                throw new Error("No se ha logrado identificar el usuario actual.");
            }
            userId = user._id;
        }else{
            throw new Error("No se ha logrado identificar el usuario");
        }
        return userId;
    }

    async list(req : Request, res : Response){
        const items = await this.repository.list();
        res.json(items)
    }

    async create(req : Request, res : Response ) {
        const { topic, category } = req.body
        const file = req.files?.file;
        if (!topic){
            throw new EValidationError('La tematica es requerida');
        }        
        if (!category){
            throw new EValidationError('La categoría es requerida');
        }
        if (file == undefined || Array.isArray(file) || file.name == 'undefined'){
            throw new EValidationError('El contenido es requerida');
        }



        const contentfile = await this.uploadService.upload(file, this.uploadSubdirectory);

        const userId = await this.getUserId(req);

        const newElement = await this.repository.create({
            category: category,
            topic: topic,
            content: contentfile,
            owner: userId,
        })

        res.json(newElement)
    }

}

export const {list, create} = new ContentController();
export default ContentController;