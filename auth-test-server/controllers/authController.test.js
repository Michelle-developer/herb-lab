const jwt = require('jsonwebtoken');
const { promisify } = require('util');

require('dotenv').config({ path: './config.env' });

const fakeUser = {
  id: '123456',
  name: '體驗帳號',
  email: process.env.GUEST_EMAIL,
  password: 'herblab000',
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('⚠️ 收到帳密:', email, password);

  if (email !== fakeUser.email || password !== fakeUser.password) {
    return res.status(401).json({ message: '帳號或密碼錯誤' });
  }

  const token = jwt.sign({ id: fakeUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'Lax',
    secure: false,
    maxAge: 12 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: 'success',
    message: '登入成功',
    user: {
      name: fakeUser.name,
      email: fakeUser.email,
    },
  });
};

exports.protect = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: '未登入' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    if (decoded.id !== fakeUser.id) {
      throw new Error('驗證失敗');
    }

    req.user = fakeUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token 無效' });
  }
};

exports.getMe = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: '尚未登入' });
  }

  res.status(200).json({
    status: 'success',
    user: {
      name: req.user.name,
      email: req.user.email,
    },
  });
};
