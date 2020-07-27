const {Op} = require('sequelize')
const {usuario} = require('../models')
const crypto = require('crypto')

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
			salt,
			name,
			email,
			cpf,
			cnpj,
			image
		} = request.body

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

				user.login = login
				user.name = name
				user.email = email
				user.cpf = cpf
				user.cnpj = cnpj
				user.image = image
			}
			else{
				return response.status(404).json({message: `Error: user ${id} not found!`})
			}
		}
		else{

		}
	}
}