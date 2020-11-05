const {Op} = require('sequelize')
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
	async delete(request,response){
		const {id} = request.params

		try{
			const countryToDelete = await country.findByPk(id)

			if(countryToDelete){
				await countryToDelete.destroy()

				return response.json({
					message: `Country ${id} successfully deleted!`
				})
			}
			else{
				return response.status(404).json({
					message: `Unable to find country with id ${id}`
				})
			}
		}
		catch(error){
			return response.status(500).json({
				message: `Internal server error!`
			})
		}
	},
	async list(request,response){

		const {searchTerm} = request.query

		try{
			const countries = await country.findAll({
				where:{
					...(searchTerm?{
						[Op.or]: [
							{
								abbreviation: {
									[Op.like]: `%${searchTerm}%`
								}
							},
							{
								name: {
									[Op.like]: `%${searchTerm}%`
								}
							},
							{
								currency: {
									[Op.like]: `%${searchTerm}%`
								}
							}
						]
					}:{})
				},
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