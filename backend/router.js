const express = require('express')
const userController = require('./controllers/userController')
const routes = express.Router()


routes.get('/', (request, response)=>{
    response.send('Server working!')
})
routes.post('/user/login', userController.login)
routes.post('/user/new', userController.auth, userController.store)
module.exports = routes