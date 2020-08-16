const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city_ extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.country, {foreignKey: 'countryId'})
      this.belongsTo(models.countryDistrict, {foreignKey: 'country_districtId'})
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