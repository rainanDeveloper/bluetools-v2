const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class provider extends Model {
		static associate(models) {
			this.belongsTo(models.country, {foreignKey: 'countryId'})
			this.belongsTo(models.countryDistrict, {foreignKey: 'country_districtId'})
			this.belongsTo(models.city, {foreignKey: 'cityId'})
		}
	}
	provider.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		ssa_vat_id: DataTypes.CHAR,
		telephone: DataTypes.CHAR,
		address_1: DataTypes.STRING,
		address_2: DataTypes.STRING,
		postal_code: DataTypes.CHAR,
		birth_date: DataTypes.DATEONLY,
		status: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'provider',
	})
	return provider
}