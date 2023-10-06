import express from "express";
import posts from "../data/posts.js";
import {
  getPosts,
  getPostById,
  createPost,
  getMyPosts,
  deletePost,
  updatePost,
  addPostToFavorites,
  deletePostFromFavorites
} from '../controllers/postController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(getPosts).post(protect, createPost);
router.route('/myposts').get(protect, getMyPosts)
router.route('/:id').get(getPostById).delete(deletePost).put(updatePost);
router.route('/favorite/:id').put(addPostToFavorites).delete(deletePostFromFavorites)


export default router;