const {user} = require('../../src/app/models')
const truncate = require('../utils/truncate')
const crypto = require('crypto')

describe('User', ()=>{
	beforeEach(async ()=>{
		await truncate()
	})
	it("should create a user hashing it's password", async  ()=>{
		const User = await user.create({
			login: 'tester',
			password_unhashed: '123456#tester',
			name: 'tester',
			email: 'tester.testing@testing.ts',
			cpf: '11111111111',
			cnpj: '111111111111111',
			image: ''
		})
		var hash = crypto.createHash('sha256').update('123456#tester'+User.salt).digest('hex')
		hash = crypto.createHash('sha256').update(hash+User.salt).digest('hex')
		hash = crypto.createHash('sha256').update(hash+User.salt).digest('hex')
		expect(User.password).toBe(hash)
	})
})