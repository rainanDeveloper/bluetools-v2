const {factory} = require('factory-girl')
const {user} = require('../src/app/models')

factory.define('user', user, {
    login: 'tester',
	password_unhashed: '12345678',
	name: '123456789',
	email: 'test.testing@test.ts',
	cpf: '11111111111',
	cnpj: '11111111111111',
	image: ''
})

module.exports=factory