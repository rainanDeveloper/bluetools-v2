const { Op } = require('sequelize')
const {contract, customer} = require('../models')

module.exports = {
	async store(request, response){
		const {id, dueDay, installationDate, customerId, status} = request.body

		if(id) {
			const contractToSave = await contract.findByPk(id)

			if(contractToSave){
				try{
					contractToSave.dueDay				= dueDay
					contractToSave.installationDate		= installationDate
					contractToSave.customerId			= customerId
					contractToSave.status				= status

					await contractToSave.save()

					return response.json(contractToSave)
				}
				catch(error){
					return response.status(500).json({
						message: `Error while saving contract ${id}!`,
						error
					})
				}
			}
			else{
				return response.status(404).json({
					message: `Contract ${id} not found!`
				})
			}
		}
		else{
			try{
				const contractCreated = await contract.create({
					dueDay,
					installationDate,
					customerId,
					status
				})
	
				return response.json(contractCreated)
			}
			catch(error){
				return response.status(500).json({
					message: `Error during contract creation!`,
					error
				})
			}
		}
	},
	async list(request, response){
		const {q, dtInit, dtEnd,status} = request.query

		try{
			const contracts = await contract.findAll({
				where: {
					...((dtInit&&dtEnd)?{
						installationDate: {
							[Op.between]: [
								dtInit,
								dtEnd
							]
						}
					}:{}),
					...(q?{
						'$customer.name$': {
							[Op.like]: `%${q}%`
						}
					}:{}),
					...(status?{status}:{})
				},
				include: [
					{
						model: customer
					}
				]
			})
	
			return response.json(contracts)
		}
		catch(error){
			return response
			.status(500)
			.json({
				message: `Error during contract searching!`,
				error
			})
		}
	},
	async delete(request, response){
		const {id} = request.params
		const contractToDelete = await contract.findByPk(id)

		if(contractToDelete){
			try{
				await contractToDelete.destroy()

				return response.json({
					message: `Contract ${id} successfully deleted!`
				})
			}
			catch(error){
				return response
				.status(500)
				.json({
					message: `Error during deletion of contract ${id}!`,
					error
				})
			}
		}
		else{
			return response
			.status(404)
			.json({
				message: `Contract ${id} not found!`
			})
		}
	}
}