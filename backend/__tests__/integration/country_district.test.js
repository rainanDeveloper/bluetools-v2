const request = require('supertest')
const truncate = require('../utils/truncate')
const factory = require('../factories')
const faker = require('faker')
const app = require('../../src/app')


describe('Country district CRUD', ()=>{
    beforeEach(async ()=>{
        await truncate()
    })

    it('should return a list of districts when the route "/countryDistrict/" is requested with get method and a valid JWT token', async ()=>{
        const testingUser = await factory.create('user')
        const createdCountry = await factory.create('country')
        const createdCountryDistrict = await factory.create('country_district',{
            countryId: createdCountry.id
        })

        const response = await request(app)
        .get('/countryDistrict/')
        .set('auth', testingUser.generateToken())
        .send()

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        
		await testingUser.destroy()
        
        await createdCountryDistrict.destroy()

        await createdCountry.destroy()
    })

    it('should return a country object as response when the route "/countryDistrict/" is requested with post method, a valid JWT token and a valid body object', async ()=>{
        const testingUser = await factory.create('user')
        const createdCountry = await factory.create('country')

        const response = await request(app)
        .post('/countryDistrict/')
        .set('auth', testingUser.generateToken())
        .send({
            code: faker.random.number(3).toString(10).padStart(3,'0'),
            abbreviation: faker.address.countryCode(),
            name: faker.address.country(),
            countryId: createdCountry.id
        })

        expect(response.status).toBe(200)
        expect(typeof(response.body)).toBe('object')

        await testingUser.destroy()
    })

    it('should delete the country specified by id param when the route "/countryDistrict/" is requested with delete method', async ()=>{
        const testingUser = await factory.create('user')
        const createdCountry = await factory.create('country')
        const createdCountryDistrict = await factory.create('country_district',{
            countryId: createdCountry.id
        })

        const response = await request(app)
        .delete(`/countryDistrict/${createdCountryDistrict.id}`)
        .set('auth', testingUser.generateToken())
        .send()

        expect(response.status).toBe(200)

        await testingUser.destroy()
        await createdCountry.destroy()
    })
})