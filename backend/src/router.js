const express = require('express')
const userController = require('./app/controllers/userController')
const routes = express.Router()
const path = require('path')


routes.use('/', express.static(path.join(__dirname, '../build')))
routes.post('/user/login', userController.login)
routes.get('/user/', userController.auth, userController.list)
routes.post('/user/new', userController.auth, userController.store)
module.exports = routes