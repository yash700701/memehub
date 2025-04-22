import mongoose from 'mongoose'

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
          userName: {type: String , required: true},
          postId: { type: mongoose.Schema.Types.ObjectId, required: true },
          text: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        }
    ],
    commentCount: { 
        type: Number, 
        default: 0 
    },
    userName: {
        type: String,
        required: true,
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    date: {
        type: Date,
        default: Date.now,
    }
      
})    

const Posts = mongoose.models.post || mongoose.model("post", PostSchema);
export default Posts;