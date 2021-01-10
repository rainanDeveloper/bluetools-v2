const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class payment_method extends Model {
    static associate(models) {
		this.hasMany(models.receivement, {foreignKey: 'payment_methodId'})
    }
  };
  payment_method.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
	modelName: 'paymentMethod',
	tableName: 'payment_methods'
  });
  return payment_method;
};