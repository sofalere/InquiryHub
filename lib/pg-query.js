const { pgConnect } = require("./pg-connection");


module.exports = {
  async addRequest(dataObj, binId) {
    const ADD_REQUEST = "INSERT INTO requests (headers, body, bin_id) + VALUES($1, $2, $3)";

    // we'll need to use getBin first before calling this method or have
    // some other way to get the bin_id
    let result = await pgConnect(ADD_REQUEST, dataObj.headers, dataObj.body, binId);
    return result.rowCount > 0;
  },

  async getBin(endpoint) {
    const FIND_BIN = "SELECT id FROM bins" +
                      "WHERE endpoint = $1";

    let result = await pgConnect(FIND_BIN, endpoint);
    return result.rows[0].id;
  },

  async getRequests() {
    const ALL_REQUESTS = "SELECT * FROM requests ORDER BY created_at ASC";

    let result = await pgConnect(ALL_REQUESTS);
    let requests = result.rows;

    return requests;
  }
}