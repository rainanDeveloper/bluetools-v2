const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class receivement extends Model {
		static associate(models) {
			this.belongsTo(models.paymentMethod, {foreignKey: 'payment_methodId'})
			this.belongsTo(models.customer, {foreignKey: 'customerId'})
			this.belongsTo(models.contract, {foreignKey: 'contractId'})
		}
	};
	receivement.init({
		userId: DataTypes.INTEGER,
		customerId: DataTypes.INTEGER,
		contractId: DataTypes.INTEGER,
		amount: DataTypes.DECIMAL,
		payed_amount: DataTypes.DECIMAL,
		due_date: DataTypes.DATEONLY,
		status: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'receivement',
	});
	return receivement;
};