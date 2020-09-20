const request = require('supertest')
const faker = require('faker')
const factory = require('../factories')
const truncate = require('../utils/truncate')
const app = require('../../src/app')

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

        expect(Array.isArray(response.body)).toBe(true)
    })

    it("Should return an error when the route '/country/' is requested with get method with invalid credentials", async ()=>{
        
    })
})