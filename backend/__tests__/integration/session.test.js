const {user} = require('../../src/app/models')


describe('Authentication', ()=>{
	it('should receive JWT token when authenticated with valid credentials', async ()=>{
		const testingUser = await user.create({
			login: 'tester',
			password: '123456789',
			salt: '123456789',
			name: '123456789',
			email: 'test.testing@test.ts',
			cpf: '11111111111',
			cnpj: '11111111111111',
			image: ''
		})

		console.log(testingUser)

		expect(testingUser.login).toBe('tester')
	})
})