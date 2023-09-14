const express = require('express');
const apiRouter = require('./routes/api');

const port = 3000;
const app = express();

const rdb = require('./lib/pg-query');
const ddb = require('./lib/mongo-query');

// allows us to read request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

function formatRequest(req) {
  return { http_path: req.path, http_method: req.method, headers: req.headers, body: req.body };
}

// accepts request at endpoint, saves in DB
app.all('/listen/:endpoint', (req, res) => {
  const endpoint = 1; // temp
  const binId = rdb.getBin(endpoint);
  const mongoId = String(ddb.addRequest(req)._id);

  rdb.addRequest(binId, mongoId, formatRequest(req));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
