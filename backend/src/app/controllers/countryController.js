const {country} = require('../models')
const {countryDistrict} = require('../models')
const {city} = require('../models')


module.exports = {
	async list(request,response){
		try{
			const countries = await country.findAll({
				include:[
					{
						model:  countryDistrict,
						required: false 
					},
					{
						model: city,
						required: false
					}
				]
			})

			response.json(countries)
		}
		catch(error){
			response.status(500).json({
				message: `Internal server error: ${error}`
			})
		}	
	}
}