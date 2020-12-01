const app = require('./app')
require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? "../.env.test" : "../.env"
})

app.listen(process.env.appPort || 3333, ()=>{
    console.log(`Server running at port ${process.env.appPort || 3333}`)
})

