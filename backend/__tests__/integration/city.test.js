const request = require('supertest')
const truncate = require('../utils/truncate')
const factory = require('../factories')
const faker = require('faker')
const app = require('../../src/app')

describe('City CRUD', ()=>{
    beforeEach(async ()=>{
        await truncate()
    })

    it('should return a list of cities when the route "/cities/" is requested with get method and a valid JWT token', async ()=>{
        const testingUser = await factory.create('user')
        const createdCountry = await factory.create('country')
        const createdCountryDistrict = await factory.create('country_district',{
            countryId: createdCountry.id
        })
        const createdCity = await factory.create('city', {
            countryId: createdCountry.id,
            country_districtId: createdCountryDistrict.id
        })
    })

    const response = await request(app)
    .get('/cities/')
    .set('auth', testingUser.generateToken())
    .send()

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
})