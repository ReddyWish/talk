import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";
import Post from "../models/postModel.js";



// @desc Auth user & get the token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
      country: user.country,
      description: user.description,
      profession: user.profession
    })
  } else {
    res.status(401);
    throw new Error('Invalid email or password')
  }
});

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User with this Email already exists')
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data')
  }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ message: 'Logged out successfully' })
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(400);
    throw new Error('User not found')
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.country = req.body.country || user.country;
    user.profession = req.body.profession || user.profession;
    user.description = req.body.description || user.description;
    user.avatar = req.body.avatar || user.avatar;

    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      country: updatedUser.country,
      profession: updatedUser.profession,
      description: updatedUser.description,
      avatar: updatedUser.avatar,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('User not found')
  }
});

// @desc Get users
// @route GET /api/users/
// @access private
const getUsersProfiles = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc Get users
// @route GET /api/users/posts/:id
// @access private
const getUsersPosts = asyncHandler(async (req, res) => {
  const userId = req.params.id
  const posts = await Post.find({ user: userId });

  res.status(200).json(posts);
});

// @desc Delete users
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  res.send(`Delete User with id ${id}`);
});

// @desc Get user by id
// @route GET /api/users/:id
// @access
const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id).select('-password');

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(400);
    throw new Error('User not found')
  }
});

// @desc Update User By id
// @route PUT /api/users/:id
// @access Private/Admin
const updateUserById = asyncHandler(async (req, res) => {

});

// @desc Save User as a favorite
// @route PUT /api/users/favorite/:id
// @access Private
const saveUserAsFavorite = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id)
  const favoriteUser = await User.findById(req.params.id).select('-password')

  if (currentUser && favoriteUser) {


    const isAlreadyFavorite = currentUser.favoriteAuthors.some(
      (author) => author._id.equals(favoriteUser._id)
    );

    if (isAlreadyFavorite) {
      res.status(400);
      throw new Error('User is already a favorite author');
    }

    currentUser.favoriteAuthors.push(favoriteUser);

    const updatedCurrentUser = await currentUser.save();

    res.status(200).json(updatedCurrentUser.favoriteAuthors)
  } else {
    res.status(400);
    throw new Error('User not found')
  }
});

// @desc get favorites users
// @route GET /api/users/favorite
// @access Private
const getFavoriteUsers = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id).populate('favoriteAuthors', '-password');

  if (currentUser) {
    const favoriteAuthors = currentUser.favoriteAuthors;

    res.status(200).json(favoriteAuthors)
  } else {
    res.status(400);
    throw new Error('User not found')
  }
});

// @desc delete User from favorites
// @route PUT /api/users/favorite/remove/:id
// @access Private
const deleteUserFromFavorites = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);

  if (!currentUser) {
    res.status(404);
    throw new Error('User not found');
  }

  const userToRemoveId = req.params.id;

  const indexToRemove = currentUser.favoriteAuthors.indexOf(userToRemoveId);

  if (indexToRemove === -1) {
    res.status(400);
    throw new Error('User is not in the favorites list');
  }

  currentUser.favoriteAuthors.splice(indexToRemove, 1);

  await currentUser.save();

  res.status(200).json({
    favoriteAuthors: currentUser.favoriteAuthors,
  });
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsersProfiles,
  deleteUser,
  getUserById,
  getUsersPosts,
  updateUserById,
  saveUserAsFavorite,
  getFavoriteUsers,
  deleteUserFromFavorites,
}





