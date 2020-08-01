module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('country', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			code: {
				type: Sequelize.CHAR(3),
				allowNull: false,
				unique: true
			},
			abbreviation: {
				type: Sequelize.CHAR(2)
			},
			name: {
				type: Sequelize.STRING
			},
			currency: {
				type: Sequelize.CHAR(3)
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('country');
	}
};