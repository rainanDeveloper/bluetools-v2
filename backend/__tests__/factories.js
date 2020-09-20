const {factory} = require('factory-girl')
const faker = require('faker')
const {user} = require('../src/app/models')
const {country} = require('../src/app/models')

factory.define('user', user, {
	login: faker.internet.userName(),
	password_unhashed: faker.internet.password(),
	name: faker.name.findName(),
	email: faker.internet.email(),
	cpf: '11111111111',
	cnpj: '11111111111111',
	image: ''
})

factory.define('country', country, {
	code: faker.random.number(3).toString().padStart(3,'0'),
	abbreviation: faker.address.countryCode(),
	name: faker.address.country(),
	currency: faker.finance.currencyCode()
})

module.exports=factory