const express = require('express')
const userController = require('./app/controllers/userController')
const routes = express.Router()
const path = require('path')


routes.use('/', express.static(path.join(__dirname, '../build')))
routes.post('/user/login', userController.login)
routes.get('/user', userController.auth, userController.list)
routes.post('/user', userController.auth, userController.store)
routes.put('/user', userController.auth, userController.change)
routes.get('/country/', (request, response)=>{
    return response.json([1])
})
module.exports = routes