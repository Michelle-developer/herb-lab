// node scripts/initFolders.js
const mongoose = require('mongoose');
const Folder = require('../models/folderModel');
const foldersData = require('../utils/foldersData.json');
require('dotenv').config({ path: './config.env' });

const guestId = new mongoose.Types.ObjectId('687dca8efe946d327acabc6b');

const randomAddedAt = () => {
  const today = new Date();
  const rand = Math.random();

  // 將中藥按比例隨機分配到三個範圍的時間內
  if (rand < 0.33) {
    return today;
  } else if (rand < 0.66) {
    const daysAgo = Math.floor(Math.random() * 3); // 0-2 天內
    return new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  } else {
    const daysAgo = Math.floor(Math.random() * 7); // 0-6 天內
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
