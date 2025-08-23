// --- File: controllers/userController.js ---
// Contains the logic for user registration, login, and blocking.
// --- controllers/userController.js ---
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register new user
// @route   POST /api/users/signup
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password: password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// @desc    Block a user
// @route   POST /api/users/block/:id
export const blockUser = async (req, res) => {
    try {
        const userToBlock = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToBlock) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add user to block list if not already there
        if (!currentUser.blockedUsers.includes(userToBlock._id)) {
            currentUser.blockedUsers.push(userToBlock._id);
            await currentUser.save();
        }
        res.json({ message: 'User blocked' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Unblock a user
// @route   DELETE /api/users/block/:id
export const unblockUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        // Remove user from block list
        currentUser.blockedUsers = currentUser.blockedUsers.filter(
            (userId) => userId.toString() !== req.params.id
        );
        await currentUser.save();
        res.json({ message: 'User unblocked' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
