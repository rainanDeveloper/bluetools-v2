const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class contract extends Model {
		static associate(models) {
			this.belongsTo(models.customer, {foreignKey: 'customerId'})
			this.hasMany(models.receivement, {foreignKey: 'contractId'})
		}
	};
	contract.init({
		dueDay: DataTypes.INTEGER,
		installationDate: DataTypes.DATEONLY,
		status: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'contract',
	});
	return contract;
};