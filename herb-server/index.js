// index.js
const express = require('express');
const app = express();
const PORT = 3001;
const fs = require('fs');
const cors = require('cors');

// 設定 CORS，讓前端能順利請求
const herbData = require(`${__dirname}/public/data/herbsData.json`);
app.use(cors());
