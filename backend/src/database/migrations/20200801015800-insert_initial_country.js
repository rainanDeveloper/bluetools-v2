const {country} = require('../../app/models')
module.exports = {
	up: async () => {
		return country.create({
			code: '076',
			abbreviation: 'BR',
			name: 'Brazil',
			currency: 'BRL'
		})
	},

	down: async () => {
		return country.findOne().then(finded=>{
			if(finded){
				return finded.destroy()
			}
			return true
		})
	}
};
