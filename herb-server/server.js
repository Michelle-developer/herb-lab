const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Herb server is running on http://127.0.0.1:${PORT}`);
});
