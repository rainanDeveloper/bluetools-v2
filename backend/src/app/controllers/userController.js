const {Op} = require('sequelize')
const {user} = require('../models')
const {passwordIsValid, emailValidation} = require('./validationController')
const crypto = require('crypto')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const config = require('../../config/config.json')

module.exports = {
	async login(request, response){
		const {login, password} = request.body
		
		const [qryResponse] = await user.findAll({
			where: {
				login: {
					[Op.like]: login
				}
			}
		})

		if(qryResponse){
			const {dataValues: userFound} = qryResponse
			var hash = crypto.createHash('sha256').update(password+userFound.salt).digest('hex')
			hash = crypto.createHash('sha256').update(hash+userFound.salt).digest('hex')
			hash = crypto.createHash('sha256').update(hash+userFound.salt).digest('hex')
			if(hash===userFound.password){
				var token = jwt.sign({id: userFound.id}, config.SECRET, {
						expiresIn: 86400
					})
				return response.json({token})
			}
			else{
				return response.status(401).json({message: 'Error: permission denied!'})
			}
		}
		else{
			return response.status(400).json({message: 'User not found!'})
		}
	},
	async store(request, response){

		const creationMoment = moment().format('YYYYMMDDHHmmSS')

		const {
			id,
			login,
			password,
			name,
			email,
			cpf,
			cnpj,
			image,
			address
		} = request.body

		var hash = ''

		if(id){
			const newUser = user.findByPk(id)

			if(newUser){
				if(cpf.replace(/\D/g, '').length!==11&&cpf.replace(/\D/g, '').length!==0){
					return response.status(400).json({message: `CPF field must have 11 numeric chars or be empty`})
				}

				if(cnpj.replace(/\D/g, '').length!==14&&cnpj.replace(/\D/g, '').length!==0){
					return response.status(400).json({message: `CNPJ field must have 14 numeric chars or be empty`})
				}

				if(!passwordIsValid(password)){
					return response.status(400).json({message: 'Invalid password!'})
				}

				if(!(emailValidation(email)&&email.length>0)){
					return response.status(400).json({message: `Email field must have an valid email or be empty`})
				}

				const salt = crypto.randomBytes(16).toString('hex')

				hash = crypto.createHash('sha256').update(password+salt).digest('hex')
				hash = crypto.createHash('sha256').update(hash+salt).digest('hex')
				hash = crypto.createHash('sha256').update(hash+salt).digest('hex')

				newUser.login = login
				newUser.name = name
				newUser.password = hash
				newUser.salt = salt
				newUser.email = email
				newUser.cpf = cpf
				newUser.cnpj = cnpj
				newUser.image = image
				newUser.address=address
				newUser.updatedAt = creationMoment

				try{
					await newUser.save()

					return response.json(newUser)
				}
				catch(error){
					return response.status(500).json({message: error})
				}
			}
			else{
				return response.status(404).json({message: `Error: user ${id} not found!`})
			}
		}
		else{
			if(cpf.replace(/\D/g, '').length!==11&&cpf.replace(/\D/g, '').length!==0){
				return response.status(400).json({message: `CPF field must have 11 numeric chars or be empty`})
			}
			if(cnpj.replace(/\D/g, '').length!==14&&cnpj.replace(/\D/g, '').length!==0){
				return response.status(400).json({message: `CNPJ field must have 14 numeric chars or be empty`})
			}
			if(!passwordIsValid(password)){
				return response.status(400).json({message: 'Invalid password!'})
			}

			if(!(emailValidation(email)&&email.length>0)){
				return response.status(400).json({message: `Email field must have an valid email or be empty`})
			}
			const salt = crypto.randomBytes(16).toString('hex')
			hash = crypto.createHash('sha256').update(password+salt).digest('hex')
			hash = crypto.createHash('sha256').update(hash+salt).digest('hex')
			hash = crypto.createHash('sha256').update(hash+salt).digest('hex')
			try{
				const newUser = await user.create({
					name,
					login,
					password: hash,
					salt,
					email,
					cpf,
					cnpj,
					image,
					address,
					createdAt: creationMoment,
					updatedAt: creationMoment
				})
	
				return response.json(newUser)
			}
			catch(error){
				return response.status(500).json({message: error})
			}
		}
	},
	async auth(request, response, next){
		const {authtoken} = request.headers
		if(!authtoken){
			return response.status(401).json({message: `Failed to authenticate!`})
		}
		jwt.verify(authtoken, config.SECRET, function(err, decoded) {
			if (err) {
				return response.status(500).json({ authtoken: false, message: 'Failed to authenticate token.' })
			}
			request.userId = decoded.id
			next()
		})
	}
}