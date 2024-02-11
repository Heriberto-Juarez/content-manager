export interface IUser {
    username: string;
    email: string;
    password?: string;
    type?: string;
}

export interface IUserDb extends IUser {
    _id: string;
    password: string;
    type: string;
    createdAt: Date,
    updatedAt: Date,
}