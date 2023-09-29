import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsersProfiles,
  deleteUser,
  getUserById,
  updateUserById,
  saveUserAsFavorite,
  getFavoriteUsers,
  deleteUserFromFavorites
} from '../controllers/userController.js';


router.route('/').get(protect, getUsersProfiles) //private
router.route('/favorite').get(protect, getFavoriteUsers) //private
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(protect, logoutUser) //private
router.route('/profile').get(protect, getUserProfile) //private
router.route('/profile').put(protect, updateUserProfile) //private
router.route('/:id').delete(protect, admin, deleteUser) //private&admin
router.route('/:id').get(protect, getUserById) //private
router.route('/:id').put(protect, admin, updateUserById) //private&admin
router.route('/favorite/:id').put(protect, saveUserAsFavorite) //private
router.route('/favorite/:id').delete(protect, deleteUserFromFavorites) //private


export default router;

