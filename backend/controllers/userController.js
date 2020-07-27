const {Op} = require('sequelize')
const {usuario} = require('../models')
const crypto = require('crypto')
const moment = require('moment')

module.exports = {
	async login(request, response){
		const {login, password} = request.body
		
		const [qryResponse] = await usuario.findAll({
			where: {
				login: {
					[Op.like]: login
				}
			}
		})

		if(qryResponse){
			const {dataValues: user} = qryResponse
			var hash = crypto.createHash('sha256').update(password+user.salt).digest('hex')
			hash = crypto.createHash('sha256').update(hash+user.salt).digest('hex')
			hash = crypto.createHash('sha256').update(hash+user.salt).digest('hex')
			if(hash===user.password){
				return response.json(user)
			}
			else{
				return response.status(401).json({message: 'Error: permission denied!'})
			}
		}
		else{
			return response.status(400).json({message: 'User not found!'})
		}
	},
	passwordIsValid(password){
		if(password.length<8){
			return false
		}

		if(!(/^[^ ]+$/g).test(password)){
			return false
		}
		
		return ((/\w/g).test(password)&&(/[^\w\s]/g).test(password))
	},
	async store(request, response){
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
			const user = usuario.findByPk(id)

			if(user){
				if(cpf.replace(/\D/g, '').length!==11&&cpf.replace(/\D/g, '').length!==0){
					return response.status(400).json({message: `CPF field must have 11 numeric chars or be empty`})
				}

				if(cnpj.replace(/\D/g, '').length!==14&&cnpj.replace(/\D/g, '').length!==0){
					return response.status(400).json({message: `CNPJ field must have 14 numeric chars or be empty`})
				}

				if(!this.passwordIsValid(password)){
					return response.status(400).json({message: 'Invalid password!'})
				}

				const salt = crypto.randomBytes(16).toString('hex')

				hash = crypto.createHash('sha256').update(password+salt).digest('hex')
				hash = crypto.createHash('sha256').update(hash+salt).digest('hex')
				hash = crypto.createHash('sha256').update(hash+salt).digest('hex')

				user.login = login
				user.name = name
				user.password = hash
				user.salt = salt
				user.email = email
				user.cpf = cpf
				user.cnpj = cnpj
				user.image = image
				user.address=address
				user.updatedAt = moment().format('YYYYMMDDHHMMSS')

				try{
					await user.save()

					return response.json(user)
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

			if(!this.passwordIsValid(password)){
				return response.status(400).json({message: 'Invalid password!'})
			}

			const salt = crypto.randomBytes(16).toString('hex')

			hash = crypto.createHash('sha256').update(password+salt).digest('hex')
			hash = crypto.createHash('sha256').update(hash+salt).digest('hex')
			hash = crypto.createHash('sha256').update(hash+salt).digest('hex')

			try{
				const user = await usuario.create({
					name,
					login,
					password: hash,
					salt,
					email,
					cpf,
					cnpj,
					image,
					address,
					createdAt: moment().format('YYYYMMDDHHMMSS'),
					updatedAt: moment().format('YYYYMMDDHHMMSS')
				})
	
				return response.json(user)
			}
			catch(error){
				return response.status(500).json({message: error})
			}
		}
	}
}