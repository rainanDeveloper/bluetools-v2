module.exports = {
	up: async (queryInterface, DataTypes) => {
		await queryInterface.createTable('users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.CHAR(64),
			allowNull: false        
		},
		salt: {
			type: DataTypes.CHAR(32)
		},
		name: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		},
		ssa_vat_id: {
			type: DataTypes.CHAR(32)
		},
		image: {
			type: DataTypes.STRING
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
		await queryInterface.dropTable('users');
	}
};