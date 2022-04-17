const axios = require('axios')
const mapAsync = require('./mapAsync.js')
const _config = require('../config.js')

let _binCodeKey = _config.apiKey.binCodes;

async function checkCreditCardMany (_creditCards) {

    const _baseURL = `https://api.bincodes.com/cc/json/${_binCodeKey}`

    let _infos = await mapAsync(_creditCards, async (_cc) => {

        try {
            
            let _bcr = await axios.get(`${_baseURL}/${_cc.number}`),
                _chkData = _bcr.data

            if (_chkData.error) {
                
                return {
                    ..._cc,
                    ..._parseCheck({}),
                    error: {
                        ...global.$knError._infoCheckNative,
                        text: _chkData.message
                    }
                }

            } else { // ok

                return {
                    ..._cc,
                    ..._parseCheck(_chkData)
                }
            }

        } catch (_err) {
            
            return {
                ..._cc,
                ..._parseCheck({}),
                error: {
                    ...global.$knError._infoCheck,
                    text: _err.toString()
                }
            }
        }
    })

    return _infos
}

function _parseCheck (_bcCheck) {
    
    return {
        level:   _bcCheck.level || null,
        card:    _bcCheck.card || null,
        type:    _bcCheck.type || null,
        bank:    _bcCheck.bank || null,
        country: _bcCheck.country || null,
        live:    true,
        valid:   _bcCheck.valid === 'true' ? true : false,
    }
}

module.exports = checkCreditCardMany