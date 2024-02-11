export interface IContent {
    category: String;
    topic: String;
    owner: String;
    content: string;
}

export interface IContentDb extends IContent {
    _id: string;
}