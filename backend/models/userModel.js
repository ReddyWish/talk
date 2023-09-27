import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favoritePosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  favoriteAuthors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: '',
  },
  profession: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
})

const User = mongoose.model("User", userSchema);

export default User;