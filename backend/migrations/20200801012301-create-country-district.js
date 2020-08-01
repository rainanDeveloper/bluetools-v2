module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('country_district', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      code: {
        type: DataTypes.CHAR(2)
      },
      abbreviation: {
        type: DataTypes.CHAR(2)
      },
      name: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.INTEGER,
        references: { model: 'country', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('country_district')
  }
};