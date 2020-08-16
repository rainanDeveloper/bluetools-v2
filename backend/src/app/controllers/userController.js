const {user} = require('../models')

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
				message: 'User not found!'
			})
		}

		if(!(await User.checkPassword(password))){
			return response.status(401).json({
				message: 'Incorrect password!'
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

	}
}