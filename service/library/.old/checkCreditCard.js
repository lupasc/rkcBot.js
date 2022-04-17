const axios = require('axios')
const _config = require('../config.js')

let _binCodeKey = _config.apiKey.binCodes;

let _deftTestCheckResponse = { // in case of API limit exceed
    "bin": "000000",
    "bank": "LIMIT_EXCEED",
    "card": "UNKNOWN",
    "type": "UNKNOWN",
    "level": "WORLD CARD",
    "country": "UNITED STATES",
    "countrycode": "US",
    "website": "HTTPS://ONLINE.CITIBANK.COM/",
    "phone": "1-800-374-9700",
    "valid": "true"
}

async function checkCreditCard (_creditCard) {

    const _URL = `https://api.bincodes.com/cc/json/${_binCodeKey}/${_creditCard.number}`

    let _r = await axios.get(_URL),
        _checkData = _r.data;

    if (_checkData.error && _checkData.message === 'API Usage Limit Exceeded') {
        return _deftTestCheckResponse
    }

    return _checkData
}

module.exports = checkCreditCard