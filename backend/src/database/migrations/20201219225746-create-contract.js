module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('contracts', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		customerId: {
			type: Sequelize.INTEGER
		},
		dueDay: {
			type: Sequelize.INTEGER
		},
		installationDate: {
			type: Sequelize.DATEONLY,
			allowNull: true
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
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('contracts');
	}
};