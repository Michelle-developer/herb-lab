const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, '請提供 e-mail'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, '請輸入有效的 e-mail'],
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  // 如果 password 沒修改，就不要再加密處理
  if (!this.isModified('password')) return next();

  // 如果密碼已經是 bcrypt hash，就不要再加密
  const isAlreadyHashed = /^\$2[aby]\$/.test(this.password);
  if (isAlreadyHashed) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
