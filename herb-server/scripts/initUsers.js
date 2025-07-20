const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const User = require('../models/userModel');

const run = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);

    // 先刪除舊的同帳號使用者
    // await User.deleteOne({ email: process.env.GUEST_EMAIL });

    const hashedPassword = process.env.GUEST_PASSWORD_HASH;

    await User.create({
      email: process.env.GUEST_EMAIL,
      name: '體驗帳號',
      password: hashedPassword,
    });

    console.log('✅ 體驗帳號建立完成');
  } catch (err) {
    console.error('❌ 初始化失敗:', err);
  } finally {
    mongoose.connection.close();
  }
};

run();
