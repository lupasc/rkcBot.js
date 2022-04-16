const { MongoClient } = require('mongodb')
const _config = require('../config.js')

let _mongoURL = _config.mongoURL,
    _mongoClient = new MongoClient(_mongoURL)

async function resolveDatabase () {

    await _mongoClient.connect()

    global.mongoDB = _mongoClient.db('pnsPekcehc')
}

module.exports = resolveDatabase;