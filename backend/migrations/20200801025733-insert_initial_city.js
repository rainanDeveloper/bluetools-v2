const moment = require('moment')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
			queryInterface.bulkInsert('city', [
				{
					code: '2905701',
					name: 'Camaçari',
					country_districtId: 1,
					countryId: 1,
					createdAt: moment().format('YYYYMMDDHHmmSS'),
					updatedAt: moment().format('YYYYMMDDHHmmSS')
				}
		])]
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('city')
  }
};
