const express = require('express');

const port = 3000;

const app = express();
//const rdb = require('./pg-query');

// allows us to read request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// homepage that displays all bins
app.get('/', (req, res) => {
  const bins = { bin0: 'http://ourappname.com/endpoint1', 
                 bin1: 'http://ourappname.com/endpoint2'}; // eventually enable rdb.getBins()
  res.send(bins);
});

// sends the relevant request data from any request made to 
// `endpoint` (which will be dynamic eventually) using any method
app.all('/listen/endpoint', (req, res) => {
  const endpoint = 'endpoint'; // when dynamic will retrieve req.params['endpoint']
  console.log(endpoint, 'METHOD:', req.method, 'PATH:', req.path, 'HEADERS:', req.headers, 'BODY:', req.body);
  const documentData = [req.headers, req.body];
  // rdb.addRequest(endpoint, req.path, req.method, documentData);
  res.send(`Any requests sent here are goin in the database! Look at all this data: ENDPOINT: ${endpoint}, METHOD: ${req.method}, PATH: ${req.path}, HEADERS: ${JSON.stringify(req.headers)}, BODY: ${JSON.stringify(req.body)}`);
});

// retrieves and displays all the requests in a specific bin
app.get('/view/:endpoint', (req, res) => {
  const endpoint = 'endpoint'; // when dynamic will retrieve req.params['endpoint']
  res.send('Look at alllll these requests for this bin!');
  // rdb.getRequests(endpoint);
});

// invalid route handling
app.get('*', (req, res) => {
  res.send('Not even a route my guy');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
