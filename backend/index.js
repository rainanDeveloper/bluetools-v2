const express = require('express')
const cors = require('cors')
const router = require('./router')
const config = require('./config/config.json')

const server = express()

server.use(cors())
server.use(express.json())
server.use(router)

server.listen(config.appPort, ()=>{
    console.log(`Server running at port ${config.appPort}`)
})