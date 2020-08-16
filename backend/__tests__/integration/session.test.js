const request = require('supertest')
const {user} = require('../../src/app/models')
const truncate = require('../utils/truncate')
const app = require('../../src/app')

describe('Authentication', ()=>{
	beforeEach(async ()=>{
		await truncate()
	})
	it('should receive JWT token when authenticated with valid credentials', async ()=>{
		const testingUser = await user.create({
			login: 'tester',
			password_unhashed: '12345678',
			name: '123456789',
			email: 'test.testing@test.ts',
			cpf: '11111111111',
			cnpj: '11111111111111',
			image: ''
		})

		const response = await request(app)
		.post('/user/login')
		.send({
			login: 'tester',
			password: '123456789'
		})

		expect(response.status).toBe(200)
	})
})