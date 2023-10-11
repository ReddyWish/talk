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
  likes: [
    {
      type: String,
    }
  ]
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
  likes: [
    {
    type: String,
  }],
  comments: [commentSchema],
  numComments: {
    type: Number,
    required: true,
    default: 0
  },
}, {
  timestamps: true
});

const Post = mongoose.model("Post", postSchema);

export default Post;