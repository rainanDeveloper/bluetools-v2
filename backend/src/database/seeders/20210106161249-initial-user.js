module.exports = {
	up: async (queryInterface) => {
		return queryInterface.bulkInsert('users', [{
			login: "Admin",
			password: "d0c05e776b36b3562c4952782291582262e093b9b11f51ce5b5e9d3d93050545",
			salt: "14a4672a95da6f54bbe7af99d44f1131",
			name: "John Doe",
			email: "",
			ssa_vat_id: "12345678909",
			image: "",
			createdAt: new Date(),
			updatedAt: new Date()
		}])
	},
	down: async (queryInterface) => {
		return queryInterface.bulkDelete('users', null, {})
	}
};
