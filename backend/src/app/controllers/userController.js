const {user} = require('../models')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const { listen } = require('../../app')


module.exports = {
	async login(request, response){
		const {login, password} = request.body

		const User = await user.findOne({
			where: {
				login
			}
		})

		if(!User){
			return response.status(401).json({
				message: 'User not found'
			})
		}

		if(!(await User.checkPassword(password))){
			return response.status(401).json({
				message: 'Incorrect password'
			})
		}

		const token = User.generateToken()

		return response.json({
			token
		})
	},
	async store(request, response){

	},
	async auth(request, response, next){
		const {auth} = request.headers

		if(!auth){
			return response.status(401).json({
				message: 'Error: no token provided'
			})
		}

		try {
			const decoded = await promisify(jwt.verify)(auth, process.env.APP_SECRET)
			request.user_id = decoded
			return next()
		}
		catch(error){
			return response.status(401).json({
				message: 'Error while validating provided authentication token'
			})
		}

	},
	async list(request, response){
		const users = await user.findAll()

		return response.json(users)
	}
}