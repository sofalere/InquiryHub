const express = require("express");

const router = express.Router();

const rdb = require('./lib/pg-query');
const ddb = require('./lib/mongo-query');  

// get all bins
router.get('/bins', async (req, res) => {
  try {
    const bins = await rdb.getAllBins();
    res.json(bins);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get one bin and its request previews
router.get('/bins/:bin_id', async (req, res) => {
  try {
    const endpoint = 1; // when dynamic will retrieve req.params['bin_id']
    const binId = await rdb.getBin(endpoint);
    const requests = await rdb.getRequests(binId);
    
    res.json(requests);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get all requests from specific bin
router.get('/bins/:bin_id/requests', async (req, res) => {
  try {
    const endpoint = 1; // when dynamic will retrieve req.params['bin_id']
    const binId = await rdb.getBin(endpoint);
    const mongoIds = await rdb.getMongoIds(binId);

    const requests = [];
    for (const id of mongoIds) {
      const request = await ddb.getRequest(id);
      requests.push(request);
    }
    
    res.json(requests);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// delete a request
router.delete('/bins/:bin_id/requests/:request_id', async (req, res) => {
  try {
    const mongoId = await rdb.deleteRequest(req.params['request_id']);
    await ddb.deleteRequest(mongoId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// delete a bin
// router.delete('/bins/:bin_id', async (req, res) => {
//   try {
//     endpoint = 1; // when dynamic will retrieve req.params['bin_id']
//     const binId = await rdb.getBin(endpoint);

//     res.sendStatus(200);
//  } catch {
//      res.status(500).send(error.message);
//  }
// });

module.exports = router;
