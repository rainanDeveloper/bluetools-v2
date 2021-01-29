module.exports = {
	up: async (queryInterface) => {
		return queryInterface.bulkInsert('cities', [{
			code: "29",
			name: "Camaçari",
			country_districtId: 1,
			countryId: 1,
			createdAt: new Date(),
			updatedAt: new Date()
		}])
	},

	down: async (queryInterface) => {
		return queryInterface.bulkDelete('cities', null, {})
	}
};
