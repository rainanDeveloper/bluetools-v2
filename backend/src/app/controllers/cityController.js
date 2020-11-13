const {Op} = require('sequelize')
const {country} = require('../models')
const {countryDistrict} = require('../models')
const {city} = require('../models')
const { delete } = require('./countryDistrictController')

module.exports = {
    async store(request, response){
        const {id, code, name, country_districtId, countryId} = request.body

        if(id){
            const existentCity = await city.findByPk(id)

            if(existentCity){
                try{
                    existentCity.code               = code
                    existentCity.name               = name
                    existentCity.country_districtId = country_districtId
                    existentCity.countryId          = countryId

                    await existentCity.save()

                    return response.json(existentCity)
                }
                catch(error){
                    return response.status(500).json({
                        message: `Internal server error: ${error}`
                    })
                }
            }
            else{
                return response.status(404).json({
                    message: `City ${id} not found!`
                })
            }
        }
        else{
            try{
                const createdCity = await city.create({
                    code,
                    name,
                    country_districtId,
                    countryId
                })
    
                return response.json(createdCity)
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

        try{
            const cities = await city.findAll({
                where: {
                    ...(searchTerm?{
						name: {
						[Op.like]: `%${searchTerm}%`
						}
					}:{})
                },
                include: [
                    country,
                    countryDistrict
                ]
            })

            return response.json(cities)
        }
        catch(error){
            return response.status(500).json({
                message: `Internal server error: ${error}`
            })
        }
    },
    async delete(request, response){
        const {id} = request.params

        const cityToDelete = await city.findByPk(id)

        if(cityToDelete){
            try{
                await cityToDelete.destroy()

                return response.json({
                    message: `City ${id} successfully deleted!`
                })
            }
            catch(error){
                return response.status(500).json({
                    message: `Internal error: ${error}`
                })
            }
        }
        else{
            return response.status(404).json({
                message: `City ${id} not found!`
            })
        }
    }
}