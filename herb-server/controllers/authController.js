const jwt = require('jsonwebtoken');
const { promisify } = require('util');
require('dotenv').config({ path: './config.env' });
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 驗證帳號
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: '帳號或密碼錯誤' });
  }

  // 簽發 token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const isProduction = process.env.NODE_ENV === 'production';

  // 寫入 cookie
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge: 12 * 60 * 60 * 1000,
  };

  if (isProduction) {
    cookieOptions.domain = '.tcmherblab.com';
  }

  res.cookie('token', token, cookieOptions);

  // res.cookie('token', token, {
  //   httpOnly: true,
  //   secure: isProduction,
  //   sameSite: isProduction ? 'None' : 'Lax',
  //   domain: isProduction ? '.tcmherblab.com' : undefined,
  //   maxAge: 12 * 60 * 60 * 1000,
  // });

  const cleanUser = await User.findById(user._id).select('name email');

  res.status(200).json({
    status: 'success',
    data: { user: cleanUser },
    message: '成功登入體驗帳號',
  });
};

exports.protect = async (req, res, next) => {
  console.log('🛡️ protect middleware 觸發了');

  // 獲取與確認前端有傳來token
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('✅ token 1:', token);
  }

  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
    console.log('✅ token 2:', token);
  }

  if (!token) {
    return res.status(401).json({ message: '尚未登入，請先登入以獲得完整權限。' });
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log('✅ decoded:', decoded);

    const user = await User.findById(decoded.id);
    console.log('👤 查到使用者:', user);

    if (!user) {
      return res.status(401).json({ message: '此帳號不存在，或已被刪除。' });
    }

    // 將驗證過的使用者資料附加到 req 物件
    req.user = user;
    console.log('⭐ 成功驗證身分，user:', req.user);

    // 判斷是否為體驗帳號（給後續權限邏輯用）
    req.isGuest = user.email === process.env.GUEST_EMAIL;
    console.log('🛡️ middleware 結束，req.user:', req.user);
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Token 無效或已過期，請重新登入。',
      error: err.message,
    });
  }
};

exports.getMe = async (req, res) => {
  console.log('🔍 getMe 被觸發了');

  try {
    // 依賴 authController.protect 中已解析 JWT 並掛載 req.user
    if (!req.user) {
      return res.status(401).json({
        status: 'fail',
        message: '尚未登入或授權無效',
      });
    }

    const user = await User.findById(req.user._id).select('name email');

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: '無法取得使用者資料',
      error: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    expires: new Date(0),
    sameSite: isProduction ? 'None' : 'Lax',
  };

  if (isProduction) {
    cookieOptions.domain = '.tcmherblab.com';
  }

  res.cookie('token', '', cookieOptions);
  // res.cookie('token', '', {
  //   httpOnly: true,
  //   secure: isProduction,
  //   expires: new Date(0), // 清除 cookie
  //   sameSite: isProduction ? 'None' : 'Lax',
  //   domain: isProduction ? '.tcmherblab.com' : undefined,
  // });

  res.status(200).json({ message: '成功登出' });
};
