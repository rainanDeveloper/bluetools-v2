const {Model} = require('sequelize');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	user.init({
		login: DataTypes.STRING,
		password_unhashed: {
			type: DataTypes.VIRTUAL,
			validate: {
				len: [8,]
			}
		},
		password: DataTypes.CHAR,
		salt: DataTypes.CHAR,
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		cpf: DataTypes.CHAR,
		cnpj: DataTypes.CHAR,
		image: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'user',
		hooks: {
			beforeSave: async user=>{
				if(user.password_unhashed){
					var salt = crypto.randomBytes(16).toString('hex')
					var hash = crypto.createHash('sha256').update(user.password_unhashed+salt).digest('hex')
					hash = crypto.createHash('sha256').update(hash+salt).digest('hex')
					hash = crypto.createHash('sha256').update(hash+salt).digest('hex')

					user.salt = salt
					user.password=hash
				}
			}
		}
	});

	user.prototype.checkPassword = function(password){
		var hash = crypto.createHash('sha256').update(password+this.salt).digest('hex')
		hash = crypto.createHash('sha256').update(hash+this.salt).digest('hex')
		hash = crypto.createHash('sha256').update(hash+this.salt).digest('hex')

		return hash===this.password
	}

	user.prototype.generateToken = function(){
		return jwt.sign({id: this.id}, process.env.APP_SECRET)
	}

	return user;
};