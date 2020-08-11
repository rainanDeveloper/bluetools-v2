const moment = require('moment')
module.exports = {
	up: async (queryInterface, Sequelize) => {
		return [
			queryInterface.bulkInsert('country', [
				{
					code: '076',
					abbreviation: 'BR',
					name: 'Brazil',
					currency: 'BRL',
					createdAt: moment().format('YYYYMMDDHHmmSS'),
					updatedAt: moment().format('YYYYMMDDHHmmSS')
				}
		])]
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('country')
	}
};
