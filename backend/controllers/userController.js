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
			return response.status(400).json({message: ''})
		}
	},
	async store(request, response){
		
	}
}