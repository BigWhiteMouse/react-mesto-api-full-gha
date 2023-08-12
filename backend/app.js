require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
//const cors = require('./middlewares/cors');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.connect(DB_URL, {
  autoIndex: true,
});

//app.use(cors);
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

app.use(helmet());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(limiter);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT);
