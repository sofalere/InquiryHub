const { pgConnect } = require("./pg-connection");


module.exports = {
  async addRequest(dataArr) {
    const ADD_REQUEST = "INSERT INTO requests (headers, body, bin) + VALUES($1, $2, $3)";

    // we'll need to use getBin first before calling this method or have
    // some other way to get the bin_id
    let result = await pgConnect(ADD_REQUEST, dataArr[0], dataArr[1], 1);
    return result.rowCount > 0;
  },

  async getBin(path) {
    const FIND_BIN = "SELECT id FROM bins" +
                      "WHERE path = $1";

    let result = await pgConnect(FIND_BIN, path);
    return result.rows[0].id;
  },

  async getRequests() {
    const ALL_REQUESTS = "SELECT * FROM requests ORDER BY created_at ASC";

    let result = await pgConnect(ALL_REQUESTS);
    let requests = result.rows;

    return requests;
  }
}