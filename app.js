require("dotenv").config();

const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const mongoose = require('mongoose');

const apiRouter = require('./routes/api');
const saveRequest = require('./routes/middleware/save-request');

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error conneccting to MongoDB', error.message);
  });

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

// io.on('connection', (socket) => {
//   console.log('a user connected');
  // socket.on('new request', (request) => {
  //   console.log('new request: ' + request);
  // });
// });
// io.on("connection", (socket) => {
//   sockets.emit("new request");
// });

app.all('/listen/:endpoint*', async (req, res) => {
  const request = await saveRequest(req);
  io.sockets.emit('new request', request);
  res.sendStatus(200);
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
