const request = require('supertest')
const faker = require('faker')
const factory = require('../factories')
const truncate = require('../utils/truncate')
const app = require('../../src/app')

describe('User CRUD', ()=>{
	beforeEach(async ()=>{
		await truncate()
	})
	
	it("should return a list of users when the route '/user/' is requested with get method", async ()=>{
		const testingUser = await factory.create('user')

		const response = await request(app)
		.get('/user/')
		.set('auth', testingUser.generateToken())
		.send()

		expect(Array.isArray(response.body)).toBe(true)
		
		await testingUser.destroy()
	})

	it("should return an user on the first position of array, due previous insertion", async ()=>{
		const testingUser = await factory.create('user')

		const response = await request(app)
		.get('/user/')
		.set('auth', testingUser.generateToken())
		.send()

		expect(response.body[0]).toHaveProperty('id')
		
		await testingUser.destroy()
	})
	
	it("should return a response with status 200(ok) when the route '/user/' is posted and the data of user is sended", async ()=>{
		const testingUser = await factory.create('user')

		const response = await request(app)
		.post('/user/')
		.set('auth', testingUser.generateToken())
		.send({
			login: faker.internet.userName(),
			password_unhashed: faker.internet.password(),
			name: faker.name.findName(),
			email: faker.internet.email(),
			cpf: '11111111111',
			cnpj: '11111111111111',
			image: ''
		})

		expect(response.status).toBe(200)
		
		await testingUser.destroy()
	})

	it("should return a response with status 400(bad request) when the route '/user/' is posted and the data of user is not sended", async ()=>{
		const testingUser = await factory.create('user')

		const response = await request(app)
		.post('/user/')
		.set('auth', testingUser.generateToken())
		.send({})

		expect(response.status).toBe(400)

		await testingUser.destroy()
	})

	it("should return a response with status 200(ok) when the route '/user/' is putted with valid id", async ()=>{
		const testingUser = await factory.create('user')

		const response = await request(app)
		.put('/user/')
		.set('auth', testingUser.generateToken())
		.send({
			id: testingUser.id
		})

		expect(response.status).toBe(200)

		await testingUser.destroy()
	})

	it("should return a response with status 400(bad request) when the route '/user/' is putted without a id", async ()=>{
		const testingUser = await factory.create('user')

		const response = await request(app)
		.put('/user/')
		.set('auth', testingUser.generateToken())
		.send({})

		expect(response.status).toBe(400)
		
		await testingUser.destroy()
	})

	it("should return a response with status 400(bad request) when the route '/user/' is putted with a invalid id", async ()=>{
		const testingUser = await factory.create('user')

		const response = await request(app)
		.put('/user/')
		.set('auth', testingUser.generateToken())
		.send({
			id: 1234
		})

		expect(response.status).toBe(400)
	
		await testingUser.destroy()
	})
})