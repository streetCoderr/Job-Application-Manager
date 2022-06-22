require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("<h1>Welcome to the very first step in building our job manager.</h1>");
})

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server is listening at port: http://localhost:${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();