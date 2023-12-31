import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
      ref: "User",
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
    default: '/images/unknownuser.jpg',
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);

export default User;