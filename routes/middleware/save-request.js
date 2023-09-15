const rdb = require('../../lib/pg/query');
const ddb = require('../../lib/mongo/query');

function formatRequest(req, endpoint) {
  return { path: formatPath(req.path, endpoint), method: req.method, headers: req.headers, body: req.body };
}

function formatPath(path, endpoint) {
  regex = new RegExp(`/listen/${endpoint}`);
  let newPath = path.replace(regex, "");
  if (newPath === "") {
    return "/";
  }
  return newPath;
}

async function saveRequest(req, res) {
  const endpoint = req.params['endpoint'];
  const binId = await rdb.getBin(endpoint);
  const addedRequest = await ddb.addRequest(formatRequest(req, endpoint));
  const mongoId = String(addedRequest._id);

  rdb.addRequest(binId, mongoId, req.method, formatPath(req.path, endpoint));

  res.sendStatus(200)
}

module.exports = saveRequest;
