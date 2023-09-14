const { pgConnect } = require("./connection");


module.exports = {
    async addRequest(binId, mongoId, method, path) {
    const ADD_REQUEST = "INSERT INTO requests (bin_id, mongo_id, method, path) " + 
                        "VALUES($1, $2, $3, $4)";

    // we'll need to use getBin first before calling this method or have
    // some other way to get the bin_id
    let result = await pgConnect(ADD_REQUEST, binId, mongoId, method, path);
    return result.rowCount > 0;
  },

  async getBin(endpoint) {
    const FIND_BIN = "SELECT id FROM bins " +
                      "WHERE endpoint = $1";

    let result = await pgConnect(FIND_BIN, endpoint);
    return result.rows[0].id;
  },

  async getAllBins() {
    const GET_BINS = "SELECT * FROM bins"

    let result = await pgConnect(GET_BINS);
    return result.rows;
  },

  async getRequest(id) {
    const GET_REQUEST = "SELECT * FROM requests WHERE id = $1";

    let result = await pgConnect(GET_REQUEST, id);
    return result.rows[0];
  },

  async getRequests() {
    const ALL_REQUESTS = "SELECT * FROM requests ORDER BY created_at ASC";

    let result = await pgConnect(ALL_REQUESTS);
    let requests = result.rows;

    return requests;
  },

  async deleteRequest(id) {
    const deletedRequest = await this.getRequest(id);
    const DELETE_REQUEST = "DELETE FROM requests WHERE id = $1";
    
    let result = await pgConnect(DELETE_REQUEST, id);
    return deletedRequest.mongo_id;
  },

  async getMongoIds(binId) {
    const FIND_IDS = "SELECT mongo_id FROM requests " +
                     "WHERE bin_id = $1";
    
    let result = await pgConnect(FIND_IDS, binId);
    return result.rows.map(obj => obj.mongo_id);
  }
}
