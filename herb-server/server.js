require('dotenv').config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

const PORT = 3000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, 'localhost', () => {
      console.log(`✅ 連接 MongoDB Atlas: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB Atlas 連接失敗:', err));
