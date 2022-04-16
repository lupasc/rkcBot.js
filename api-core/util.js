const Chance = require('chance')

let $g = global,
    $c = $g.confs;

function shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
         let rand = Math.floor(Math.random() * (i + 1));
         [array[i], array[rand]] = [array[rand], array[i]]
    }
}

function maybe (_chance, ops) {

    let $chance = new Chance()

    if (!_chance) {
        _chance = 50;
    }
    
    let $do = $chance.bool({ 
        likelihood: _chance 
    })

    if ($do) {
        ops.do()
    } else {
        ops.dont()
    }
}

function isBadBank (bank) {
    
    let isbadBank = $c.blacklistBanks.some(_bank => { 
        return bank.includes(_bank)
    })

    return isbadBank
}

async function delayRandom (delay = {}, _logTxt = '') {

    const min = delay.min,
          max = delay.max

    let _rms = Math.floor(Math.random() * (max - min + 1)) + min;

    if (_logTxt && _logTxt.length !== 0) {
        console.log(_logTxt, _rms)
    }

    return new Promise(resolve => setTimeout(resolve, _rms))
}

function containsEachotherAny (firstarr, targetarr) {
    return firstarr.find(v => { 
        return targetarr.includes(v)
    })
}

function arrayRotate (arr, count) {
    const _arr = Array.from(arr)
    count = count % _arr.length;
    while (_arr.length && count < 0) count += _arr.length;
    _arr.push.apply(_arr, _arr.splice(0, count));
    return _arr;
}

function logPort (port) {
    return () => {
        console.log(`[\x1b[34mSERVER\x1b[37m] Listening on port: \x1b[36m${port} 🤖 \x1b[37m`)
        return console.log('...', '\n')
    }
}

function assignKey (query) {
    let obj = {}
    obj[$c.apiKeyName] = $c.apiKeyValue
    return Object.assign(query, obj)
}

module.exports = {
    
    setup () {

        let util = {
            containsEachotherAny,
            arrayRotate,
            shuffleArray,
            delayRandom,
            isBadBank,
            maybe,
            logPort,
            assignKey
        }

        Object.assign(global, { util })
    }
}