const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.country_district)
		}
	};
	country.init({
		code: DataTypes.CHAR,
		abbreviation: DataTypes.CHAR,
		name: DataTypes.STRING,
		currency: DataTypes.CHAR
	}, {
		sequelize,
		modelName: 'country',
		tableName: 'country'
	});
	return country;
};