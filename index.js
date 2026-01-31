const express = require('express');

const path = require('path')

const server = express();



server.listen(8989,()=>{
    console.log("server : http://localhost:8989")
})