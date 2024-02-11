import mongoose from "mongoose";
import { IUser } from "../types/interfaces/IUser";

const UserSchema = new mongoose.Schema<IUser>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique :true},
    password: {type: String, required: true}, // hashed password
    type: {type: String,required: true,}
}, {
    timestamps: true
});

export const User = mongoose.model('User',UserSchema);