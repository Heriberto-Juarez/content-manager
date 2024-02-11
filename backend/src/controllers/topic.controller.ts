import { Request, Response } from "express";
import { CategoryRepository } from "../repositories/category.repository";
import { EValidationError } from "../errors/EValidationError";
import { TopicRepository } from "../repositories/topic.repository";
import { ITopic, ITopicDb } from "../types/interfaces/ITopic";


interface ITopicType {
    key: string,
    name: string,
    mimeTypes: string[],
}

class TopicController {

    repository : TopicRepository = new TopicRepository();

    topicTypes: ITopicType[] = [
        {
            key: 'IMG',
            name: 'Imágenes',
            mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml', 'image/webp']
        },
        {
            key: 'VIDEO',
            name: 'Vídeo',
            mimeTypes: ['video/mp4', 'video/webm']
        },
        {
            key: 'TXT',
            name: 'Archivos de Texto',
            mimeTypes: ['text/plain']
        }
    ]
    
    constructor() {
        this.list = this.list.bind(this)
        this.create = this.create.bind(this)
        this.listTopicTypes = this.listTopicTypes.bind(this)
    }

    getAllowedTypesHumanReadable(types : string[]){
        return this.topicTypes.filter((type)=>{
            return types.includes(type.key);
        }).map((type)=>{
            return type.name
        }).join(", ")
    }

    async listTopicTypes(req : Request, res : Response) {
        res.json(this.topicTypes)
    }

    async list(req : Request, res : Response) {
        const topics = await this.repository.list();

        const finalTopics = topics.map((topic)=>{
            const newtopic : ITopicDb = {
                _id: `${topic._id}`,
                topic: topic.topic,
                allowedTypes: topic.allowedTypes,
            }
            newtopic.humanReadableTypes = this.getAllowedTypesHumanReadable(topic.allowedTypes)
            return newtopic;
        })
        res.json(finalTopics)
    }

    async create(req : Request, res : Response){
        let {topic, allowedTypes } = req.body;

        if (!allowedTypes){
            throw new EValidationError("Los tipos permitidos son requeridos");
        }
        
        allowedTypes = allowedTypes.split(";")

        if(!topic){
            throw new EValidationError("El nombre de la tematica es requerido.");
        }

        const exists = await this.repository.existsCategory(topic)
        if (exists){
            throw new EValidationError("La tematica ya existe.");
        }

        const newTopic= (await this.repository.create({
            topic,
            allowedTypes
        }))


        await newTopic.save();

        res.json({
            _id: newTopic._id,
            topic: newTopic.topic,
            humanReadableTypes: this.getAllowedTypesHumanReadable(allowedTypes)
        })

    }

}

export const {create, list, listTopicTypes} = new TopicController();
export default TopicController;