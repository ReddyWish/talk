import asyncHandler from "../middleware/asyncHandler.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";


// @desc Fetch all posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
  res.json(posts);
});

// @desc Fetch post
// @route GET /api/posts/:id
// @access Private
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    return res.json(post);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
})

// @desc Delete post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id
  res.send(`Delete Post with id ${id}`);
})

// @desc Update post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const id = req.params.id
  res.send(`Update Post with id ${id}`);
})

// @desc Add post to favorites
// @route PUT /api/posts/favorite/:id
// @access Private
const addPostToFavorites = asyncHandler(async (req, res) => {
  const id = req.params.id
  res.send(`Add Post with id ${id} to favorites`);
})

// @desc Delete post from favorites
// @route DELETE /api/posts/favorite/:id
// @access Private
const deletePostFromFavorites = asyncHandler(async (req, res) => {
  const id = req.params.id
  res.send(`Delete Post with id ${id} from favorites`);
})

export {
  getPosts,
  getPostById,
  deletePost,
  updatePost,
  addPostToFavorites,
  deletePostFromFavorites
}