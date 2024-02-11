import { Request, Response } from "express";
import { CategoryRepository } from "../repositories/category.repository";
import { EValidationError } from "../errors/EValidationError";
import { ValidationError } from "yup";
import { UploadService } from "../services/UploadService";
import { ENotFoundError } from "../errors/ENotFoundError";
import path from "path";
import fs from 'fs';

class CategoryController {

    uploadSubdirectory = 'category';
    repository : CategoryRepository = new CategoryRepository();
    uploadService = new UploadService();

    constructor() {
        this.list = this.list.bind(this)
        this.create = this.create.bind(this)
        this.deleteById = this.deleteById.bind(this)
    }

    async list(req : Request, res : Response) {
        const categories = await this.repository.list();
        res.json(categories)
    }

    async create(req : Request, res : Response){
        const {category } = req.body;
        const file = req.files?.file;
        if (file == undefined || Array.isArray(file) || file.name == 'undefined'){
            throw new EValidationError('La portada es requerida');
        }
        if (!file.mimetype.startsWith("image")){
            throw new EValidationError("Solo se permite subir imagenes.");
        }
        const uploadedFile = await this.uploadService.upload(file, this.uploadSubdirectory);
        if(!category){
            throw new EValidationError("El nombre de la categoría es requerido.");
        }
        const exists = await this.repository.existsCategory(category)
        if (exists){
            throw new EValidationError("La categoría ya existe.");
        }
        const newCategory = await this.repository.create({
            category,
            image: uploadedFile,
        })
        res.json(newCategory)
    }

    async deleteById(req : Request, res : Response){
        const id = req.params.id;

        const category = await this.repository.getById(id)

        if(category == null){
            throw new ENotFoundError("La categoría ya no existe.");
        }

        const categoryImg = path.join(this.uploadService.uploadFolder, this.uploadSubdirectory, `${category!.image}`)
        
        if (typeof category.image == 'string' && fs.existsSync(categoryImg)){
            fs.rmSync(categoryImg)
        }

        await this.repository.delteCategory(id);
        res.json({})
    }

}

export const {create, list, deleteById} = new CategoryController();
export default CategoryController;