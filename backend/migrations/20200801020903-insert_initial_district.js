const moment = require('moment')
module.exports = {
	up: async (queryInterface, Sequelize) => {
		return [
			queryInterface.bulkInsert('country_district', [
				{
					code: '29',
					abbreviation: 'BA',
					name: 'Bahia',
					countryId: 1,
					createdAt: moment().format('YYYYMMDDHHmmSS'),
					updatedAt: moment().format('YYYYMMDDHHmmSS')
				}
		])]
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('country_district')
	}
};
