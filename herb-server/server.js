const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const PORT = 3000;

mongoose
  .connect('mongodb://127.0.0.1:27017/herbLab', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ 已連接 MongoDBHerb :  http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB 連接失敗:', err));
