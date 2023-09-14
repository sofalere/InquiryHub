const Request = require('./models/request');

module.exports = {
  async getRequest(id) {
    const request = Request.findById(id);
    return request;
  },

  async getAllRequests() {
    const requests = await Request.find({});
    return requests;
  },

  async addRequest(requestToAdd) {
    const request = new Request(requestToAdd);
    const savedRequest = await request.save();
    return savedRequest;
  },

  async deleteRequest(id) {
    const removedRequest = await Request.findByIdAndRemove(id);
    return removedRequest;
  }
}
