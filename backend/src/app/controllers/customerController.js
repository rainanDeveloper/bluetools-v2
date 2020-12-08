const {customer} = require('../models')
const {Op} = require('sequelize')
const moment = require('moment')

module.exports = {
	async store(request,response){
		//Get customer's data and store it into customer table
		//If customer already exists it must update it (identified by id)
		const {
			id,
			name,
			cpf,
			email,
			telephone,
			countryId,
			country_districtId,
			cityId,
			address,
			cep,
			birth_date,
			status
		} = request.body

		if(id){
			//Update customer if existent

			const existentCustomer = await customer.findByPk(id)

			if(existentCustomer){
				try{
					existentCustomer.name				= name
					existentCustomer.cpf				= cpf
					existentCustomer.email				= email
					existentCustomer.telephone			= telephone
					existentCustomer.countryId			= countryId
					existentCustomer.country_districtId	= country_districtId
					existentCustomer.cityId				= cityId
					existentCustomer.address			= address
					existentCustomer.cep				= cep
					existentCustomer.birth_date			= birth_date
					existentCustomer.status				= status

					await existentCustomer.save()

					return response.json(existentCustomer)
				}
				catch(error){
					return response.status(500).json({
						message: `Error while saving customer info`,
						error
					})
				}
			}
			else{
				return response.status(404).json({
					message: `Customer not found into database!`
				})
			}
		}
		else{
			//Save new customer
			try{
				const newCustomer = await customer.create({
					name,
					cpf,
					email,
					telephone,
					countryId,
					country_districtId,
					cityId,
					address,
					cep,
					birth_date,
					status
				})

				return response.json(newCustomer)
			}
			catch(error){
				return response.status(500).json(
					{
						message: `Error while creating customer`,
						error
					}
				)
			}
		}

	},
	async list(request,response){
		//Get search params and list all users matching the search elements
		const {searchTerm,cityId,country_districtId,countryId,birthDateStart,birthDateEnd,cadDateStart,cadDateEnd} = request.query

		//Creates the search object only with filled query params

		const birthDateSearch = ((birthDateStart&&birthDateEnd)?{
			birth_date: {
				[Op.between]: [
					birthDateStart,
					birthDateEnd
				]
			}
		}:{})
		const cadDateSearch = ((cadDateStart&&cadDateEnd)?{
			createdAt: {
				[Op.between]: [
					moment(cadDateStart).startOf('day'),
					moment(cadDateEnd).endOf('day')
				]
			}
		}:{})

		const conditions = {
			...birthDateSearch,
			...cadDateSearch,
			...(cityId?{cityId}:{}),
			...(country_districtId?{country_districtId}:{}),
			...(countryId?{countryId}:{}),
			...(searchTerm?{
				name: {
					[Op.like]: `%${searchTerm}%`
				}
			}:{})
		}
		
		//...Finally the search is executed 

		try{
			const customers = await customer.findAll({
				where: conditions
			})
	
			return response.json(customers)
		}
		catch(error){
			return response.status(500).json({
				message: `Error during customer search`,
				error
			})
		}

	},
	async delete(request, response){
		const {id} = request.params
		const customerToDelete = await customer.findByPk(id)

		if(customerToDelete){
			try{
				await customerToDelete.destroy()
				return response.json({
					message: `Customer ${id} successfully deleted!`
				})
			}
			catch(error){
				return response.status(500).json({
					message: `Error while deleting customer ${id}!`,
					error
				})
			}
		}
		else{
			return response.status(404).json({
				message: `Customer not found!`
			})
		}
	}
}