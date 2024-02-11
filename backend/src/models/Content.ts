import mongoose from "mongoose";
import { IContent } from "../types/interfaces/IContent";

const ContentSchema = new mongoose.Schema<IContent>({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    topic: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Topic'
    },
    content: { type: String, required: true, unique: true },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
}, {
    timestamps: true
});


export const Content = mongoose.model('Content', ContentSchema);