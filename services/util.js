const Chance = require('chance')
const config = require('./config.js')

const $chance = new Chance()

function maybe (_chance, ops) {

    if (!_chance) {
        _chance = 50;
    }
    
    let $do = $chance.bool({ 
        likelihood: _chance 
    })

    if ($do) {
        ops.do()
    }

    if (!$do) {
        ops.dont()
    }
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

global.util = {
    maybe,
    delayRandom
}

module.exports = null;