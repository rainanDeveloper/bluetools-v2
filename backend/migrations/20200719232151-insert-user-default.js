const crypto = require('crypto')
const moment = require('moment')

module.exports = {
	up: async (queryInterface, DataTypes) => {
		var salt = crypto.randomBytes(16).toString('hex')

		var hash = crypto.createHash('sha256').update('admin'+salt).digest('hex')
		hash = crypto.createHash('sha256').update(hash+salt).digest('hex')
		hash = crypto.createHash('sha256').update(hash+salt).digest('hex')

		return [
			queryInterface.bulkInsert('user', [
				{
					name: "Admin",
					login: 'admin',
					password: hash,
					salt,
					email: '',
					cpf: '00000000000',
					cnpj: '00000000000000',
					image: '',
					createdAt: moment().format('YYYYMMDDHHmmSS'),
					updatedAt: moment().format('YYYYMMDDHHmmSS')
				}
		])]
	},

	down: async (queryInterface, DataTypes) => {
		return queryInterface.bulkDelete('user')
	}
};
