// 啟動命令：node scripts/initFolders.js
const mongoose = require('mongoose');
const Folder = require('../models/folderModel');
const foldersData = require('../utils/foldersData.json');
require('dotenv').config({ path: './config.env' });

const guestId = new mongoose.Types.ObjectId('687dca8efe946d327acabc6b');

// 隨機分配到三個區段
const randomAddedAt = () => {
  const today = new Date();
  const rand = Math.random();

  if (rand < 0.33) {
    // 今日收藏
    return today;
  } else if (rand < 0.66) {
    // 上週收藏（7～13 天前）
    const daysAgo = Math.floor(Math.random() * 7) + 7;
    return new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  } else {
    // 近期收藏（14～60 天前）
    const daysAgo = Math.floor(Math.random() * 47) + 14;
    return new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  }
};

const run = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);

    await Folder.deleteMany({ source: 'system' });

    const transformed = foldersData.map((folder) => ({
      ...folder,
      owner: guestId,
      items: folder.items.map((item) => ({
        ...item,
        addedAt: randomAddedAt(),
      })),
    }));

    await Folder.insertMany(transformed);
    console.log('✅ 資料夾初始化完成');
  } catch (err) {
    console.error('❌ 初始化失敗:', err);
  } finally {
    mongoose.connection.close();
  }
};

run();
