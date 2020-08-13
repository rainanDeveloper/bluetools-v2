const crypto = require('crypto')
const {user} = require('../../app/models')
module.exports = {
	up: async () => {
		var salt = crypto.randomBytes(16).toString('hex')

		var hash = crypto.createHash('sha256').update('admin'+salt).digest('hex')
		hash = crypto.createHash('sha256').update(hash+salt).digest('hex')
		hash = crypto.createHash('sha256').update(hash+salt).digest('hex')

		return user.create({
			name: "Admin",
			login: 'admin',
			password: hash,
			salt,
			email: '',
			cpf: '00000000000',
			cnpj: '00000000000000',
			image: ''
		})
	},

	down: async () => {
		return user.findOne().then(finded=>{
			return finded.destroy()
		})
	}
};
