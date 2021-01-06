module.exports = {
	up: async (queryInterface) => {
		return queryInterface.bulkInsert('country_districts', [{
			code: "29",
			abbreviation: "BA",
			name: "Bahia",
			countryId: 1,
			createdAt: new Date(),
			updatedAt: new Date()
		}])
	},

	down: async (queryInterface) => {
		return queryInterface.bulkDelete('country_districts', null, {})
	}
};
