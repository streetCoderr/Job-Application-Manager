require('dotenv').config();
require("express-async-errors");
const cors = require('cors');
const helmet = require('helmet');
const xss_clean = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const PORT = process.env.PORT || 3000;
const authorize = require("./middlewares/authorization")
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
// security
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(helmet());
app.use(cors());
app.use(xss_clean())


// routes
app.use('/api/v1/jobs', authorize, jobsRouter);
app.use('/api/v1/auth', authRouter);

// middlewares
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is listening at port: http://localhost:${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();