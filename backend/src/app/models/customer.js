const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class customer extends Model {
		static associate(models) {
		// define association here
		}
	};
	customer.init({
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		cpf: DataTypes.CHAR,
		telephone: DataTypes.CHAR,
		countryId: DataTypes.INTEGER,
		country_districtId: DataTypes.INTEGER,
		cityId: DataTypes.INTEGER,
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