const express = require('express')
const userController = require('./app/controllers/userController')
const countryController = require('./app/controllers/countryController')
const countryDistrictController = require('./app/controllers/countryDistrictController')
const routes = express.Router()
const path = require('path')

// public folder

routes.use('/', express.static(path.join(__dirname, '../../build')))
routes.use('/dashboard', express.static(path.join(__dirname, '../../build')))
routes.use('/pais', express.static(path.join(__dirname, '../../build')))
routes.use('/ufs', express.static(path.join(__dirname, '../../build')))

// Api

routes.post('/user/login', userController.login)
routes.get('/user', userController.auth, userController.list)
routes.post('/user', userController.auth, userController.store)
routes.put('/user', userController.auth, userController.change)
routes.post('/country/', userController.auth, countryController.store)
routes.get('/country/', userController.auth, countryController.list)
routes.delete('/country/:id', userController.auth, countryController.delete)
routes.get('/countryDistrict/', userController.auth, countryDistrictController.list)
routes.post('/countryDistrict/', userController.auth, countryDistrictController.store)
routes.delete('/countryDistrict/:id', userController.auth, countryDistrictController.delete)
module.exports = routes