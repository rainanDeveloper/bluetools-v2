module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('cities', {
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
				defaultValue: 1,
				onDelete: 'CASCADE',
				references: { model: 'country_districts', key: 'id'}
			},
			countryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 1,
				references: { model: 'countries', key: 'id' }
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
		await queryInterface.dropTable('cities');
	}
};