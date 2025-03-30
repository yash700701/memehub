import mongoose from 'mongoose'
import { type } from 'os';

const PostSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String, 
        maxlength: 300     
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            text: {
                type: String
            }, 
            createdAt: Date 
        }
    ],
})    

const Posts = mongoose.model.posts || mongoose.model("posts", PostSchema);
export default Posts;