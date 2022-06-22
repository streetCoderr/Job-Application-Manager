require('dotenv').config();
require("express-async-errors");
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const PORT = process.env.PORT || 3000;
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

app.use('/api/v1/jobs', jobsRouter);
app.use('/api/v1/auth', authRouter);

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