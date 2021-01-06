const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class customer extends Model {
		static associate(models) {
			this.hasMany(models.contract, {foreignKey: 'customerId',onDelete: 'CASCADE'})
			this.belongsTo(models.country, {foreignKey: 'countryId'})
			this.belongsTo(models.countryDistrict, {foreignKey: 'country_districtId'})
			this.belongsTo(models.city, {foreignKey: 'cityId'})
		}
	};
	customer.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		ssa_vat_id: DataTypes.CHAR,
		telephone: DataTypes.CHAR,
		address: DataTypes.STRING,
		cep: DataTypes.CHAR,
		birth_date: DataTypes.DATEONLY,
		status: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'customer',
	});
	return customer;
};