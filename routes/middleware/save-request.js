const rdb = require('../../lib/pg/query');
const ddb = require('../../lib/mongo/query');

function formatRequest(req) {
  return { http_path: req.path, http_method: req.method, headers: req.headers, body: req.body };
}

async function saveRequest(req, res) {
  const endpoint = 1; // temp
  const binId = await rdb.getBin(endpoint);
  // const mongoId = String(ddb.addRequest(formatRequest(req))._id);
  const addedRequest = await ddb.addRequest(formatRequest(req));
  const mongoId = String(addedRequest._id);

  rdb.addRequest(binId, mongoId, req.method, req.path);

  res.sendStatus(200)
}

module.exports = saveRequest;
