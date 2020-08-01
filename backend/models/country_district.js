const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class country_district extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.country)
			this.hasMany(models.city)

    }
  };
  country_district.init({
    code: DataTypes.CHAR,
    abbreviation: DataTypes.CHAR,
    name: DataTypes.STRING,
    country: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'country_district',
    tableName: 'country_district'
  });
  return country_district;
};