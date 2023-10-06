import asyncHandler from "../middleware/asyncHandler.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";


// @desc Fetch all posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate('user', 'name', );

  const postsWithUsername = posts.map((post) => ({
    _id: post._id,
    title: post.title,
    content: post.content,
    image: post.image,
    likes: post.likes,
    comments: post.comments,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    username: post.user.name,
  }));

  res.json(postsWithUsername);
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

// @desc Fetch post
// @route GET /api/posts/myposts
// @access Private
const getMyPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const posts = await Post.find({ user: userId });

  res.status(200).json(posts);

})

// @desc Delete post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) {
    return res.status(404).json({ message: 'Post not found' })
  }
  res.status(200).json(deletedPost)
})

// @desc Create post
// @route POST /api/posts
// @access Private
const createPost = asyncHandler(async (req, res) => {
    const { title, content, image } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const post = new Post({
      title,
      content,
      user: req.user._id,
      image: image ? image : '/images/default.jpg',
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost)
})

// @desc Update post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const id = req.params.id
  const post = await Post.findById(id)

  if (post) {
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.image = req.body.image || post.image;

    const updatedPost = await post.save();

    res.status(200).json({
      _id: updatedPost._id,
      user: updatedPost.user,
      title: updatedPost.title,
      content: updatedPost.content,
      image: updatedPost.image,
      likes: updatedPost.likes
    });
  } else {
    res.status(400);
    throw new Error('post not found')
  }
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
  getMyPosts,
  createPost,
  deletePostFromFavorites
}