const {city} = require('../../app/models')
module.exports = {
  up: async () => {
		return city.create({
			code: '2905701',
			name: 'Camaçari',
			country_districtId: 1,
			countryId: 1
		})
  },

  down: async () => {
    return city.findOne().then(finded=>{
		if(finded){
			return finded.destroy()
		}
		return true
	})
  }
};
