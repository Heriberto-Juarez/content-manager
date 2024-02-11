import { Content } from "../models/Content";
import { IContent } from "../types/interfaces/IContent";


export class ContentRepository {

    async list() {
        return await Content
        .find()
        .populate('owner', 'username')
        .populate('category', 'category')
        .populate('topic', 'topic')
    }

    async create(content : IContent){
        const newContent = await Content.create({
            category: content.category,
            content: content.content,
            owner: content.owner,
            topic: content.topic
        })
        const result = await newContent.save();
        return result;
    }
    
}