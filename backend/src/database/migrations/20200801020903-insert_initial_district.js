const {countryDistrict} = require('../../app/models')
module.exports = {
	up: async () => {
		return countryDistrict.create({
			code: '29',
			abbreviation: 'BA',
			name: 'Bahia',
			countryId: 1
		})
	},

	down: async () => {
		return countryDistrict.findOne().then(finded=>{
			return finded.destroy()
		})
	}
};
