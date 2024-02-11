import mongoose from "mongoose";
import { ICategory } from "../types/interfaces/ICategory";

const CategorySchema = new mongoose.Schema<ICategory>({
    category: {type: String, required: true, unique: true}, 
    image: {type: String, required: true,}
}, {
    timestamps: true
});

export const Category = mongoose.model('Category',CategorySchema);