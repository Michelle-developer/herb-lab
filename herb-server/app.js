const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const herbRouter = require('./routes/herbRoutes');
const folderRouter = require('./routes/folderRoutes');
const demoFolderRouter = require('./routes/demoFolderRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173', 'https://herb-lab.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// 開發測試用
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
console.log('⭐', process.env.NODE_ENV, 'mode');

// MIDDLEWARE
app.use((req, res, next) => {
  console.log('✅ 代理伺服器收到請求:', req.method, req.originalUrl);
  next();
});

// ROUTES
app.use('/api/herbs', herbRouter);
app.use('/api/my-lab/folders', folderRouter);
app.use('/api/my-lab/demo/folders', demoFolderRouter);
app.use('/api/users', userRouter);

module.exports = app;
