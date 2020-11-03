const express = require('express');
const server = express();
const hubsRouter = require('./hubs/hub-router.js')



server.use(express.json());

server.use('/api/hubs',hubsRouter)


server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Hubs API</h>
      <p>Welcome to the Lambda Hubs API</p>
    `);
  });
  
 

  module.exports = server;