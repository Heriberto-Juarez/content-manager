import { Category } from "../models/Category";
import { ICategory } from "../types/interfaces/ICategory";


export class CategoryRepository {

    async list() {
        return await Category.find()
    }

    async getByCategory(category : string) : Promise<ICategory|null>{
        return await Category.findOne({category: category});
    }

    async existsCategory(category: string){
        return (await this.getByCategory(category)) != null;
    }

    async getById(id : string) {
        return await Category.findOne({_id: id})
    }
    
    async existsById(id : string){
        return (this.getById(id)) != null;
    }

    async create(category : ICategory){
        const newCategory = new Category({
            category: category.category,
            image: category.image
        });
        const data = await newCategory.save();
        return data;
    }

    async delteCategory(id : string) {
        await Category.deleteOne({_id: id})
    }

}