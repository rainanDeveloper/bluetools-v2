const request = require('supertest')
const factory = require('../factories')
const truncate = require('../utils/truncate')
const app = require('../../src/app')
const crypto = require('crypto')

describe('Authentication', ()=>{
	beforeEach(async ()=>{
		await truncate()
	})
	it('should authenticate when passed valid credentials', async ()=>{
		const testingUser = await factory.create('user', {
			password_unhashed: 'rightpassword'
		})

		console.log(testingUser)

		const response = await request(app)
		.post('/user/login')
		.send({
			login: testingUser.login,
			password: 'rightpassword'
		})

		expect(response.status).toBe(200)
	})

	it("shouldn't authenticate with invalid credentials", async ()=>{
		const testingUser = await factory.create('user', {
			password_unhashed: 'rightpassword'
		})

		const response = await request(app)
		.post('/user/login')
		.send({
			login: testingUser.login,
			password: 'wrongpassword'
		})

		expect(response.status).toBe(401)
	})

	it('should receive a JWT token when authenticated', async ()=>{
		const testingUser = await factory.create('user', {
			password_unhashed: 'rightpassword'
		})

		const response = await request(app)
		.post('/user/login')
		.send({
			login: testingUser.login,
			password: 'rightpassword'
		})

		expect(response.body).toHaveProperty('token')
	})

	it('should be able to access private routes when authenticated with a valid token', async ()=>{
		const testingUser = await factory.create('user')

		const response = await request(app)
		.get('/user/')
		.set('auth', testingUser.generateToken())
		.send()

		expect(response.status).toBe(200)
	})

	it("should'n be able to access private routes when not authenticated", async ()=>{
		const testingUser = await factory.create('user')

		const response = await request(app)
		.get('/user/')
		.send()

		expect(response.status).toBe(401)
	})

	it("should'n be able to access private routes when authenticated with a invalid token", async ()=>{
		const testingUser = await factory.create('user')

		const response = await request(app)
		.get('/user/')
		.set('auth', crypto.randomBytes(16).toString('hex'))
		.send()

		expect(response.status).toBe(401)
	})
})