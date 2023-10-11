import express from "express";
import posts from "../data/posts.js";
import {
  getPosts,
  getPostById,
  createPost,
  getMyFavoritePosts,
  getMyPosts,
  createPostComment,
  deletePostComment,
  editPostComment,
  deletePost,
  updatePost,
  addPostToFavorites,
  deletePostFromFavorites,
  likePost
} from '../controllers/postController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(getPosts).post(protect, createPost);
router.route('/myposts').get(protect, getMyPosts);
router.route('/myfavoriteposts').get(protect, getMyFavoritePosts);
router.route('/:id/comments').post(protect, createPostComment);
router.route('/:id/comments/:commentId').put(protect, editPostComment).delete(protect, deletePostComment);
router.route('/:id').get(getPostById).delete(deletePost).put(updatePost);
router.route('/like/:id').put(protect, likePost)
router.route('/favorite/:id').put(protect, addPostToFavorites)
router.route('/favorite/remove/:id').put(protect, deletePostFromFavorites)


export default router;