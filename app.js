const express = require('express');
const apiRouter = require('./routes/api');
const saveRequest = require('./routes/middleware/save-request');

const port = 3000;
const app = express();

const rdb = require('./lib/pg-query');
const ddb = require('./lib/mongo-query');

// allows us to read request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

// accepts request at endpoint, saves in DB
app.all('/listen/endpoint', saveRequest)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
