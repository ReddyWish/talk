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

// @desc Fetch post
// @route GET /api/posts/myfavoriteposts
// @access Private
const getMyFavoritePosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const favoritePostIds = user.favoritePosts;

  const favoritePosts = await Post.find({ _id: { $in: favoritePostIds } }).populate('user', '-password');

  res.status(200).json(favoritePosts)

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

// @desc Like the post
// @route PUT /api/posts/like/:id
// @access Private
const likePost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const post =  await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }
  const likeIndex = post.likes.findIndex((like) => like.toString() === userId.toString());
  if (likeIndex === -1) {
    post.likes.push(userId.toString())
  } else {
    post.likes.splice(likeIndex, 1)
  }
  await post.save()

  // const commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId);
  // post.likes.push(userId.toString());
  res.status(200).json({ message: 'Like success'})
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

// @desc Create post comment
// @route POST /api/posts/:id/comments
// @access Private
const createPostComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const post = await Post.findById(req.params.id);

  const newComment = {
    comment,
    user: req.user._id
  }

  post.comments.push(newComment);

  await post.save();
  res.status(201).json({ message: 'Comment posted' })
})

// @desc Delete post comment
// @route DELETE /api/posts/:id/comments/:commentId
// @access Private
const deletePostComment = asyncHandler(async (req, res) => {
 const postId = req.params.id;
 const commentId = req.params.commentId;

 const post = await Post.findById(postId);

 if (!post) {
   return res.status(404).json({ message: 'Post not found' });
 }
 const commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId);

 if (commentIndex === -1) {
   return res.status(404).json({ message: 'Comment not found' });
 }

 post.comments.splice(commentIndex, 1);

 await post.save();

 res.status(200).json({ message: 'Comment deleted' })
})

// @desc Edit post comment
// @route PUT /api/posts/:id/comments/:commentId
// @access Private
const editPostComment = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const { comment } = req.body;
  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const commentToUpdate = post.comments.find((comment) => comment._id.toString() === commentId);

  if (!commentToUpdate) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  commentToUpdate.comment = comment;

  await post.save();

  res.status(200).json({ message: 'Comment updated' });

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
  const currentUser = await User.findById(req.user._id)
  const post = await Post.findById(req.params.id)

  if (currentUser && post) {

    const isPostAlreadyFavorite = currentUser.favoritePosts.some(
      (favoritePost) => favoritePost._id.equals(post._id)
    )

    if (isPostAlreadyFavorite) {
      res.status(400);
      throw new Error('Post already added as favorite');
    }

    currentUser.favoritePosts.push(post);

    const updatedCurrentUser = currentUser.save();

    res.status(200).json(updatedCurrentUser.favoritePosts)

  } else {
    res.status(400);
    throw new Error('User not found')
  }
})

// @desc Delete post from favorites
// @route PUT /api/posts/favorite/remove/:id
// @access Private
const deletePostFromFavorites = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id)
  const postToRemoveId = req.params.id;

  if (!currentUser) {
    res.status(400);
    throw new Error('User not Found')
  }

  const postIndexToRemove = currentUser.favoritePosts.indexOf(postToRemoveId);

  if (postIndexToRemove === -1) {
    res.status(400);
    throw new Error('Post is not in the favorites list');
  }

  currentUser.favoritePosts.splice(postIndexToRemove, 1);

  await currentUser.save();

  res.status(200).json({
    favoritePosts: currentUser.favoritePosts
  })
})

export {
  getPosts,
  getPostById,
  deletePost,
  updatePost,
  addPostToFavorites,
  getMyPosts,
  createPostComment,
  likePost,
  getMyFavoritePosts,
  createPost,
  deletePostComment,
  editPostComment,
  deletePostFromFavorites
}