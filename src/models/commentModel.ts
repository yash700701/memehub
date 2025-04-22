import mongoose, {Schema, Document} from "mongoose";

export interface commentType extends Document{
    userId: mongoose.Schema.Types.ObjectId;
    userName: string;
    postId: mongoose.Schema.Types.ObjectId;
    text: string;
    createdAt: Date
} 

const commentSchema: Schema<commentType> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Comments = mongoose.models.comment as mongoose.Model<commentType> || mongoose.model<commentType>("comment", commentSchema)

export default Comments