const {factory} = require('factory-girl')
const faker = require('faker')
const {user} = require('../src/app/models')

factory.define('user', user, {
    login: faker.internet.userName(),
	password_unhashed: faker.internet.password(),
	name: faker.name.findName(),
	email: faker.internet.email(),
	cpf: '11111111111',
	cnpj: '11111111111111',
	image: ''
})

module.exports=factory