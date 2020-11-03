const express = require ('express');
const server = express();
const postsRouter = require('./data/post-router.js')

server.use(express.json());

server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send(`
        <h2> Node api 2 project</h2>
    `)
})

module.exports = server;