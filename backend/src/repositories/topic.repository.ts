import { Topic } from "../models/Topic";
import { ITopic, ITopicDb } from "../types/interfaces/ITopic";


export class TopicRepository {

    async list() {
        return await Topic.find()
    }

    async getByTopic(topic : string) : Promise<ITopicDb|null>{
        return await Topic.findOne({topic: topic});
    }

    async existsCategory(topic: string){
        return (await this.getByTopic(topic)) != null;
    }

    async create(topic : ITopic){
        const newtopic = new Topic({
            topic: topic.topic,
            allowedTypes: topic.allowedTypes,
        });
        const data = await newtopic.save();
        return data;
    }

}