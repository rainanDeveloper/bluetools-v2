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
				type: Sequelize.CHAR(7),
				allowNull: false
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			country_districtId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'country_district', key: 'id'}
			},
			countryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
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