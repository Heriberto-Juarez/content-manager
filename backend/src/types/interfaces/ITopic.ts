export interface ITopic {
    topic: string;
    allowedTypes: string[],
    humanReadableTypes?: string;
}

export interface ITopicDb extends ITopic {
    _id: string;
    createdAt?: Date,
    updatedAt?: Date,
}