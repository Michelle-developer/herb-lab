const express = require('express');
const morgan = require('morgan');
const herbRouter = require('./routes/herbRoutes');
const folderRouter = require('./routes/folderRoutes');

const app = express();
const cors = require('cors');

// MIDDLEWARES
console.log('⭐', process.env.NODE_ENV, 'mode');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors()); // TODO:上線前修改成只允許herb-lab存取herb-server

app.use((req, res, next) => {
  console.log('✅ Hello from the middleware!');
  next();
});

// ROUTES
app.use('/api/herbs', herbRouter);
app.use('/api/my-lab/folders', folderRouter);

module.exports = app;
