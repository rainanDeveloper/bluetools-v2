const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class city_ extends Model {
		static associate(models) {
		this.belongsTo(models.country, {foreignKey: 'countryId'})
		this.belongsTo(models.countryDistrict, {foreignKey: 'country_districtId'})
		this.hasMany(models.customer, {foreignKey: 'cityId'})
		this.hasMany(models.provider, {foreignKey: 'cityId'})
		}
	};
	city_.init({
		code: DataTypes.CHAR,
		name: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'city'
	});
	return city_;
};