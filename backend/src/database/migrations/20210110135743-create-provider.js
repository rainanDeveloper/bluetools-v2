module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('providers', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		ssa_vat_id: {
			type: Sequelize.CHAR(32),
			allowNull: false,
			unique: true
		},
		telephone: {
			type: Sequelize.CHAR(15)
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
		address_1: {
			type: Sequelize.STRING
		},
		address_2: {
			type: Sequelize.STRING
		},
		postal_code: {
			type: Sequelize.CHAR(10),
			allowNull: false
		},
		birth_date: {
			type: Sequelize.DATEONLY
		},
		status: {
			type: Sequelize.INTEGER
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE
		}
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('providers');
	}
};