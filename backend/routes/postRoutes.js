import express from "express";
import posts from "../data/posts.js";
import {
  getPosts,
  getPostById,
  deletePost,
  updatePost,
  addPostToFavorites,
  deletePostFromFavorites } from '../controllers/postController.js';

const router = express.Router();

router.route('/').get(getPosts);
router.route('/:id').get(getPostById).delete(deletePost).put(updatePost);
router.route('/favorite/:id').put(addPostToFavorites).delete(deletePostFromFavorites)

export default router;