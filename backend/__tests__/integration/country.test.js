const request = require('supertest')
const faker = require('faker')
const factory = require('../factories')
const truncate = require('../utils/truncate')
const app = require('../../src/app')
const { response } = require('../../src/app')

describe('Country CRUD', ()=>{
    beforeEach(async ()=>{
        await truncate()
    })

    it('should return a list od countries when the route "/country/" is requested with get method with a valid JWT token', async ()=>{
        const testingUser = await factory.create('user')
        await factory.create('country')

        const response = await request(app)
        .get('/country/')
        .set('auth', testingUser.generateToken())
        .send()

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(typeof(response.body[0])).toBe('object')
    })

    it("Should return an error when the route '/country/' is requested with get method with invalid credentials", async ()=>{
        await factory.create('country')

        const response = await request(app)
        .get('/country/')
        .set('auth', '123456')
        .send()

        expect(response.status).toBe(401)
    })

    it("Should return an object when the route '/country/' is requested with post method and valid credentials", async ()=>{
        const testingUser = await factory.create('user')

        const response = await request(app)
        .post('/country/')
        .set('auth', testingUser.generateToken())
        .send({
            code: faker.random.number(3).toString(10).padStart(3,'0'),
            abbreviation: faker.address.countryCode(),
            name: faker.address.country(),
            currency: faker.finance.currencyCode()
        })

        expect(response.status).toBe(200)
        expect(typeof(response.body)).toBe('object')
    })

    it("Should return an object when the route '/country/' is requested with post method and valid credentials and id of an existent country", async ()=>{
        const testingUser = await factory.create('user')
        const createdCountry = await factory.create('country')

        const fakeCountry = {
            id: createdCountry.id,
            code: faker.random.number(3).toString(10).padStart(3,'0'),
            abbreviation: faker.address.countryCode(),
            name: faker.address.country(),
            currency: faker.finance.currencyCode()
        }

        const response = await request(app)
        .post('/country/')
        .set('auth', testingUser.generateToken())
        .send(fakeCountry)

        fakeCountry.createdAt = response.body.createdAt
        fakeCountry.updatedAt = response.body.updatedAt

        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual(fakeCountry)
    })
})