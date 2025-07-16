const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const PORT = 3000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ 連接 MongoDB Atlas: http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB Atlas 連接失敗:', err));
