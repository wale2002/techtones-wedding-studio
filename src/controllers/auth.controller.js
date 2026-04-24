const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/response.utils');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    sendResponse(res, 201, true, 'User registered', { token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return sendResponse(res, 401, false, 'Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    sendResponse(res, 200, true, 'Login successful', { token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
