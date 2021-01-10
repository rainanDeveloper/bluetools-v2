const express = require('express')
const userController = require('./app/controllers/userController')
const countryController = require('./app/controllers/countryController')
const countryDistrictController = require('./app/controllers/countryDistrictController')
const cityController = require('./app/controllers/cityController')
const customerController = require('./app/controllers/customerController')
const contractController = require('./app/controllers/contractController')
const routes = express.Router()
const path = require('path')

// public folder

routes.use('/', express.static(path.join(__dirname, './public')))
routes.use('/*', express.static(path.join(__dirname, './public')))

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
routes.get('/city/', userController.auth, cityController.list)
routes.post('/city/', userController.auth, cityController.store)
routes.delete('/city/:id', userController.auth, cityController.delete)
routes.get('/customer/', userController.auth, customerController.list)
routes.post('/customer/', userController.auth, customerController.store)
routes.delete('/customer/:id', userController.auth, customerController.delete)
routes.get('/contract/', userController.auth, contractController.list)
routes.post('/contract/', userController.auth, contractController.store)
routes.delete('/contract/:id', userController.auth, contractController.delete)

module.exports = routes