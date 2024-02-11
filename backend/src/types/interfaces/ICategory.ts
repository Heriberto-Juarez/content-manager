export interface ICategory {
    category: string;
    image: string;
}

export interface ICategoryDb extends ICategory {
    _id: string;
    createdAt: Date,
    updatedAt: Date,
}