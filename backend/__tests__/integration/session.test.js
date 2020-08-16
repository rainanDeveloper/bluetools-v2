const request = require('supertest')
const factory = require('../factories')
const truncate = require('../utils/truncate')
const app = require('../../src/app')

describe('Authentication', ()=>{
	beforeEach(async ()=>{
		await truncate()
	})
	it('should authenticate when passed valid credentials', async ()=>{
		const testingUser = await factory.create('user', {
			password_unhashed: 'rightpassword'
		})

		const response = await request(app)
		.post('/user/login')
		.send({
			login: 'tester',
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
			login: 'tester',
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
			login: 'tester',
			password: 'rightpassword'
		})

		expect(response.body).toHaveProperty('token')
	})
})