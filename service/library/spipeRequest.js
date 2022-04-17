const axios = require('axios')
const config = require('../config.js')

let $c = config;

const spipeRequest = axios.create({
    baseURL: config.spipeURL,
    auth: $c.authData
})

module.exports = spipeRequest;