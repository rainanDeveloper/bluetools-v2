const {user} = require('../../app/models')
module.exports = {
	up: async () => {

		return user.create({
			name: "Admin",
			login: 'admin',
			password_unhashed: 'admin123',
			email: '',
			cpf: '00000000000',
			cnpj: '00000000000000',
			image: ''
		})
	},

	down: async () => {
		return user.findOne().then(finded=>{
			if(finded){
				return finded.destroy()
			}
			return true
		})
	}
};
