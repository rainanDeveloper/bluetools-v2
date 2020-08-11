const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city_ extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.country)
      this.belongsTo(models.country_district)
    }
  };
  city_.init({
    code: DataTypes.CHAR,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'city',
    tableName: 'city'
  });
  return city_;
};