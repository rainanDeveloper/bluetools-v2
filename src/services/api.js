const axios = require('axios')
const config = require('./config.js')

var baseURL = ''

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // Development:
    baseURL = config.backendURL
} else {
    //Production:
    baseURL = window.location.origin.toString()
    
}

const api = axios.create({baseURL})

export default api