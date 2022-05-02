const axios = require('axios')
const cheerio = require('cheerio')
const iso = require('iso-3166-1')
const { forEach } = require('p-iteration')
const HtmlTableToJson = require('html-table-to-json')
const ccCheckBasic = require('./ccCheckBasic.js')
const ccCheckDuplicity = require('./ccCheckDuplicity.js')

async function ccCheckRequestMany (
                            _ccTextArray = [], 
                                _session = Object) {

    // -> _bins array of bin string 6 send
    // - if not 66 digit string it trims to six

    let _binsArray = _ccTextArray.map(_str => {
        return _str.substr(0, 6)
    })

    // -> console.log('_binsArray', _binsArray)

    let _sep = '%0D%0A',
        _binsText = _binsArray.join(_sep),
        _dataText = `action=searchbins&bins=${_binsText}&bank=&country=`;

    // -> console.log('_binsText', _binsText)
    // -> console.log('_dataText', _dataText)

    const response = await axios({
        url: 'http://bins.su/',
        method: 'POST',
        data: _dataText,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.100.4855.0 Safari/537.36',      
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            'Connection': 'keep-alive',
            'Host': 'bins.su',
            'Accept-Language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'upgrade-insecure-requests': '1'
        }
    })

    if (!response.data) {
        return {
            error: {
                code: 501,
                text: 'Failed to fetch data'
            }
        }
    }

    const $ = cheerio.load(response.data)
    
    let result = $('#result').html()
    
    if (!result) {
        return {
            error: {
                code: 404,
                text: 'NotFound (not bins found bins)'
            }
        }
    }

    let _binReqDataArray = HtmlTableToJson.parse(result)._results[0],
        _infosObjArray = [];

    forEach(_ccTextArray, async (_ccTxt, _index) => {

        let _ccBin = _ccTxt.substr(0, 6),
            _binReqData = _binReqDataArray.find(_bd => {
                return _bd.BIN === _ccBin
            })

        for (let $k in _binReqData) {
            if (_binReqData[$k] === '') {
                _binReqData[$k] = 'NUBANK'
            }
        }

        let _ccTxtIntoArray = _ccTxt.split('|'),
            _ccTxtArrayIntoObj = {
                number: _ccTxtIntoArray[0],
                month: _ccTxtIntoArray[1],
                year: _ccTxtIntoArray[2],
                cvv: _ccTxtIntoArray[3]
            }

        let _ccObjInToInfoObj = {};
            
        if (!_binReqData) {
            
            _ccObjInToInfoObj = {
                ..._ccTxtArrayIntoObj,
                level: "?",
                type: "?",
                card: "?",
                bank: "?",
                country: "?",
                _valid: 'Não',
                _errorValid: 'Invalid BIN'
            }

        } else {
            
            const _checkBasic = ccCheckBasic(_ccTxtArrayIntoObj)

            if (!_checkBasic.valid) {
                _ccObjInToInfoObj = {
                    ..._ccTxtArrayIntoObj,
                    level: _binReqData.Level,
                    type: _binReqData.Type,
                    card: _binReqData.Vendor,
                    bank: _binReqData.Bank,
                    country: _binReqData.Country,
                    _valid: 'Não',
                    _errorValid: _checkBasic.error
                }
            }

            if (_checkBasic.valid) {

                const _checkDuplicity = await ccCheckDuplicity(
                        _ccTxtArrayIntoObj, 
                            _session);

                if (_checkDuplicity) {
                    _ccObjInToInfoObj = {
                        ..._ccTxtArrayIntoObj,
                        level: _binReqData.Level,
                        type: _binReqData.Type,
                        card: _binReqData.Vendor,
                        bank: _binReqData.Bank,
                        country: _binReqData.Country,
                        _valid: 'Não',
                        _errorValid: 'Stored duplicity'
                    }
                }

                // finally if...
                if (!_checkDuplicity) {
                    _ccObjInToInfoObj = {
                        ..._ccTxtArrayIntoObj,
                        level: _binReqData.Level,
                        type: _binReqData.Type,
                        card: _binReqData.Vendor,
                        bank: _binReqData.Bank,
                        country: _binReqData.Country,
                        _valid: 'Sim', // Sim, Não
                        _errorValid: null
                    }
                }
            }
        }

        

        _infosObjArray.push(_ccObjInToInfoObj)

        // if (_checkBasic.valid) {
            
        //     if (!_binReqData){
        //         _ccObjInToInfoObj = {
        //             ..._ccTxtArrayIntoObj,
        //             level: "?",
        //             type: "?",
        //             card: "?",
        //             bank: "?",
        //             country: "?",
        //             _valid: 'Não',
        //             _errorValid: 'Invalid BIN'
        //         }
        //     }

        //     if (_binReqData) {
        //         _ccObjInToInfoObj = {
        //             ..._ccTxtArrayIntoObj,
        //             level: _binReqData.Level,
        //             type: _binReqData.Type,
        //             card: _binReqData.Vendor,
        //             bank: _binReqData.Bank,
        //             country: _binReqData.Country,
        //             _valid: 'Sim', // Sim, Não
        //             _errorValid: null
        //         }
        //     }

        // } else { // invalid cc number

        //     _ccObjInToInfoObj = {
        //         ..._ccTxtArrayIntoObj,
        //         level: _binReqData.Level,
        //         type: _binReqData.Type,
        //         card: _binReqData.Vendor,
        //         bank: _binReqData.Bank,
        //         country: _binReqData.Country,
        //         _valid: 'Não',
        //         _errorValid: _checkBasic.error
        //     }
        // }

        // _infosObjArray.push(_ccObjInToInfoObj)
    })

    if (result) {
        return {
            error: null,
            data: _infosObjArray
        }
    }
}

module.exports = ccCheckRequestMany