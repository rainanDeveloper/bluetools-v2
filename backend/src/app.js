const express = require('express')
const cors = require('cors')

class AppController {
    constructor(){
        this.express = express()

        this.midlewares()
        this.routes()
    }

    midlewares(){
        this.express.use(cors())
        this.express.options('*', cors())
        this.express.use(express.json())
    }

    routes(){
        this.express.use(require('./router'))
    }
}

module.exports = new AppController().express