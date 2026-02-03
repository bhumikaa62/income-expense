const express = require('express');
const path = require('path')

const webRouter = require('./routers/WebRouter');


const server = express();
server.use(express.json());

server.use("/auth", webRouter)


server.listen(8989, () => {
    console.log("server : http://localhost:8989")
})