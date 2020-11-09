const {Op} = require('sequelize')
const {country} = require('../models')
const {countryDistrict} = require('../models')
const {city} = require('../models')


module.exports = {
	async store(request, response){
		const {id, code, abbreviation, name, countryId} = request.body

		if(id){
			try{
				const district = await countryDistrict.findByPk(id)

				if(district){
					district.code = code
					district.abbreviation = abbreviation
					district.name = name
					district.countryId = countryId

					await district.save()

					const updatedDistrict = await countryDistrict.findByPk(district.id, {
						include: country
					})

					return response.json(updatedDistrict)
				}
				else{
					return response.status(404).json({
						message: `Country district ${id} not found!`
					})
				}
			}
			catch(error){
				return response.status(500).json({
					message: `Internal server error: ${error}`
				})
			}
		}
		else{
			try{
				const district = await countryDistrict.create({
					code,
					abbreviation,
					name,
					countryId
				})

				const updatedDistrict = await countryDistrict.findByPk(district.id, {
					include: country
				})
	
				return response.json(updatedDistrict)
			}
			catch(error){
				return response.status(500).json({
					message: `Internal server error: ${error}`
				})
			}
		}

	},
	async list(request, response){
		const {searchTerm} = request.query

		try {
			const countryDistricts = await countryDistrict.findAll({
				where: {
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
							}
						]
					}:{})
				},
				include: [
					{
						model: country
					},
					{
						model: city,
						required: false
					}
				]
			}
			)

			return response.json(countryDistricts)
		} catch (error) {
			return response.status(500).json({
				message: `Internal server error: ${error}`
			})
		}
	},
	async delete(request, response){
		const {id} = request.params

		const district = await countryDistrict.findByPk(id)
		if(district){
			try{
				await district.destroy()

				return response.json({
					message: `Country District ${id} successfully deleted!`
				})
			}
			catch(error){
				return response.status(500).json({
					message: `Error during deletion of Country District ${id}: ${error}`
				})
			}
		}
		else{
			return response.status(404).json({
				message: `Country District ${id} not found!`
			})
		}
	}
}