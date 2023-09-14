require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const saveRequest = require('./routes/middleware/save-request');

const port = 3000;
const app = express();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error conneccting to MongoDB', error.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Homepage');
});

// accepts request at endpoint, saves in DB
app.all('/listen/endpoint', saveRequest)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
