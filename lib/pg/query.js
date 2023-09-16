const { pgConnect } = require("./connection");

function generateRandomAlphanumeric(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

module.exports = {
    async addRequest(binId, mongoId, method, path) {
    const ADD_REQUEST = "INSERT INTO requests (bin_id, mongo_id, method, path) " + 
                        "VALUES($1, $2, $3, $4) RETURNING *";

    // we'll need to use getBin first before calling this method or have
    // some other way to get the bin_id
    let result = await pgConnect(ADD_REQUEST, binId, mongoId, method, path);
    // console.log(result.rows[0])
    return result.rows[0];
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

  async getRequestsWithBinId(binId) {
    const ALL_REQUESTS = "SELECT * FROM requests WHERE bin_id = $1 " + 
                         "ORDER BY created_at ASC";

    let result = await pgConnect(ALL_REQUESTS, binId);
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
  },

  async addBin() {
    const endpoint = generateRandomAlphanumeric(12)
    const INSERT_BIN = "INSERT INTO bins (endpoint) " +
                     "VALUES ($1) RETURNING *"
    
    let result = await pgConnect(INSERT_BIN, endpoint);
    return result.rows[0];
  },
}
