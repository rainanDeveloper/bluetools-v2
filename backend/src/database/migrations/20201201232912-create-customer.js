module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('customers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			cpf: {
				type: Sequelize.CHAR(11),
				allowNull: false,
				unique: true
			},
			telephone: {
				type: Sequelize.CHAR(14),
				allowNull: false,
				unique: true
			},
			countryId: {
				type: Sequelize.INTEGER,
				references:{
					model: 'countries',
					key: 'id'
				}
			},
			country_districtId: {
				type: Sequelize.INTEGER,
				references:{
					model: 'country_districts',
					key: 'id'
				}
			},
			cityId: {
				type: Sequelize.INTEGER,
				references:{
					model: 'cities',
					key: 'id'
				}
			},
			address: {
				type: Sequelize.STRING
			},
			cep: {
				type: Sequelize.CHAR(8)
			},
			birth_date: {
				type: Sequelize.DATEONLY,
				allowNull: false,
			},
			status: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
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
	down: async (queryInterface) => {
		await queryInterface.dropTable('customers');
	}
};