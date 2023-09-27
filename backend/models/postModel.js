import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  comment: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0,
    required: true,
  }
}, {
  timestamps: true,
})

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    default: ""
  },
  likes: {
    type: Number,
    default: 0,
    required: true,
  },
  comments: [commentSchema],
}, {
  timestamps: true
});

const Post = mongoose.model("Post", postSchema);

export default Post;