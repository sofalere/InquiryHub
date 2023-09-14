const rdb = require('../../lib/pg-query');
const ddb = require('../../lib/mongo-query');

function formatRequest(req) {
  return { http_path: req.path, http_method: req.method, headers: req.headers, body: req.body };
}

function saveRequest(req, res) {
  const endpoint = 1; // temp
  const binId = rdb.getBin(endpoint);
  const mongoId = String(ddb.addRequest(req)._id);

  rdb.addRequest(binId, mongoId, formatRequest(req));

  res.sendStatus(200)
}

module.exports = saveRequest;