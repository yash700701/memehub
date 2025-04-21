import mongoose, {Schema, Document} from "mongoose";



export interface likeType extends Document{
    userId: mongoose.Schema.Types.ObjectId;
    postId: mongoose.Schema.Types.ObjectId;
} 

const likeSchema: Schema<likeType> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})

const Likes = mongoose.models.like as mongoose.Model<likeType> || mongoose.model<likeType>("like", likeSchema)

export default Likes