const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  method: String,
  path: String,
  headers: {},
  body: {},
});

requestSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Request', requestSchema);
