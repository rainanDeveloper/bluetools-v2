const {user} = require('../models')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')


module.exports = {
	async login(request, response){
		const {login, password} = request.body

		try{
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
		}
		catch(error){
			return response.status(500).json(
				{
					message: `Error during login attempt`,
					error
				}
			)
		}
	},
	async store(request, response){
		const {
			id,
			login,
			password_unhashed,
			name,
			email,
			cpf,
			cnpj,
			image
		} = request.body

		if(id){
			const User = await user.findByPk(id)

			if(!User){
				return response.status(400).json({message: 'id invalid'})
			}
		
			try{
				User.login=login
				User.password_unhashed=password_unhashed
				User.name=name
				User.email=email
				User.cpf=cpf
				User.cnpj=cnpj
				User.image=image
		
				User.save()
		
				return response.json(User)		
			}
			catch(error){
				return response.status(400).json({
					message: 'Error during user update!',
					error
				})
			}
		}
		else{
			try{
				const User = await user.create({
					login,
					password_unhashed,
					name,
					email,
					cpf,
					cnpj,
					image
				})
				return response.json(User)
			}
			catch(error){
				return response.status(400).json({message: 'You must supply all the requirements for user creation!'})
			}
		}
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
	},
	async delete(request, response){
		const {id} = request.params

		if(parseInt(id)===request.user_id.id){
			return response.status(401)
			.json({
				message: `Unabled to delete authenticated user!`
			})
		}

		try{
			const userToDelete = await user.findByPk(id)

			if(userToDelete){
				await userToDelete.destroy()

				return response.json({
					message: `User ${id} successfully deleted!`
				})
			}
			else{
				return response.status(404).json({
					message: `Unable to find user with id ${id}`
				})
			}
		}
		catch(error){
			return response.status(500).json({
				message: `Internal server error: ${error}!`
			})
		}
	}
}