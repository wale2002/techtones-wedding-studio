const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { sendResponse } = require('../utils/response.utils');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendResponse(res, 401, false, 'Not authorized to access this route');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return sendResponse(res, 401, false, 'Not authorized to access this route');
  }
};

module.exports = { protect };
