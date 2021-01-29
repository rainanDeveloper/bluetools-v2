module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('payments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'users',
					key: 'id'
				}
			},
			customerId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'customers',
					key: 'id'
				}
			},
			contractId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'contracts',
					key: 'id'
				}
			},
			payment_methodId:{
				type: Sequelize.INTEGER,
				references: {
					model: 'payment_methods',
					key: 'id'
				}
			},
			amount: {
				type: Sequelize.DECIMAL
			},
			payed_amount: {
				type: Sequelize.DECIMAL
			},
			due_date: {
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
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('payments');
	}
};