const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class contract extends Model {
		static associate(models) {
			this.belongsTo(models.customer, {foreignKey: 'customerId'})
		}
	};
	contract.init({
		dueDay: DataTypes.INTEGER,
		installationDate: DataTypes.DATEONLY
	}, {
		sequelize,
		modelName: 'contract',
	});
	return contract;
};