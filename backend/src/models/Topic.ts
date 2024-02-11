import mongoose from "mongoose";
import { ITopic } from "../types/interfaces/ITopic";

const TopicSchema = new mongoose.Schema<ITopic>({
    topic: {type: String, required: true, unique: true},
    allowedTypes: [
        {
            type: String,
        }
    ]
}, {
    timestamps: true
});


export const Topic = mongoose.model('Topic',TopicSchema);