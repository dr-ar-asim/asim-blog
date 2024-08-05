import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

  thumbnail: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }

})

const PostModel = mongoose.models.post || mongoose.model('post', postSchema)

export default PostModel;