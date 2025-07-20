const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const guestEmail = process.env.GUEST_EMAIL;
const guestPasswordHash = process.env.GUEST_PASSWORD_HASH;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== guestEmail) {
    return res.status(401).json({ message: '無效的e-mail' });
  }

  const match = await bcrypt.compare(password, guestPasswordHash);
  if (!match) {
    return res.status(401).json({ message: '無效的密碼' });
  }

  const token = jwt.sign({ email: 'guest_user_1@herblab.dev' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 12 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: 'success',
    message: '成功登入體驗帳號',
  });
};
