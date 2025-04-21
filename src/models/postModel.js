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
          userId: { type: mongoose.Schema.Types.ObjectId, required: true },
          postId: { type: mongoose.Schema.Types.ObjectId, required: true },
          text: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        }
    ],
    commentCount: { 
        type: Number, 
        default: 0 
    },
      
})    

const Posts = mongoose.models.post || mongoose.model("post", PostSchema);
export default Posts;