module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('countries', [{
			code: "076",
			abbreviation: "BR",
			name: "Brasil",
			currency: "BRL",
			createdAt: new Date(),
			updatedAt: new Date()
		}])
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('countries', null, {})
	}
};
