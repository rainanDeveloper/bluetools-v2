module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('city', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			code: {
				type: Sequelize.CHAR(7)
			},
			abbreviation: {
				type: Sequelize.CHAR(2)
			},
			name: {
				type: Sequelize.STRING
			},
			country_district: {
				type: Sequelize.INTEGER,
				references: { model: 'country_district', key: 'id'}
			},
			country: {
				type: Sequelize.INTEGER,
				references: { model: 'country', key: 'id' }
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
		await queryInterface.dropTable('city');
	}
};