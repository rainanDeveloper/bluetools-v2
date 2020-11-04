const {country} = require('../models')
const {countryDistrict} = require('../models')
const {city} = require('../models')


module.exports = {
	async store(request, response){
		const {id, code, abbreviation, name, currency} = request.body

		if(id){
			const countryToEdit = await country.findByPk(id)
			if(countryToEdit){
				countryToEdit.code			= code
				countryToEdit.abbreviation	= abbreviation
				countryToEdit.name			= name
				countryToEdit.currency		= currency

				try{
					countryToEdit.save()

					return response.json(countryToEdit)
				}
				catch(error){
					return response.status(500).json({
						message: `Error while saving country ${id}: ${error}`
					})
				}
			}
		}
		else{
			try{
				const countryCreated = await country.create({
					code,
					abbreviation,
					name,
					currency
				})
	
				return response.json(countryCreated)
			}
			catch(error){
				return response.status(500).json({
					message: `Error during country creation: ${error}`
				})
			}
		}

	},
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