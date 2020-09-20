const {user} = require('../../src/app/models')
const factory = require('../factories')
const truncate = require('../utils/truncate')
const crypto = require('crypto')

describe('User', ()=>{
	beforeEach(async ()=>{
		await truncate()
	})
	it("should create a user hashing it's password", async  ()=>{
		const User = await factory.create('user')
		
		var hash = crypto.createHash('sha256').update(User.password_unhashed+User.salt).digest('hex')
		hash = crypto.createHash('sha256').update(hash+User.salt).digest('hex')
		hash = crypto.createHash('sha256').update(hash+User.salt).digest('hex')
		expect(User.password).toBe(hash)
	})
})