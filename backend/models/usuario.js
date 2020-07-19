const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  usuario.init({
    login: DataTypes.STRING,
    password: DataTypes.CHAR,
    salt: DataTypes.CHAR,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.CHAR,
    cnpj: DataTypes.CHAR,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuario',
    tableName: 'usuario'
  });
  return usuario;
};