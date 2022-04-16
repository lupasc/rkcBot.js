const Chance = require('chance')
const { customAlphabet } = require('nanoid')

let   $g = global,
      $u = $g.util,
      $c = $g.confs,
      $d = $c.delays;

// constructor class prototype
function ListRotator (array) {
    
    const chance = new Chance()
    
    this._id = chance.hash(7)

    $g[`lscounter_${this._id}`] = 0;

    Object.defineProperty(this, 'counter', {
        enumerable: true,
        configurable: false,
        get () { return $g[`lscounter_${this._id}`] }
    })
    
    this.roll = () => {
        const rotated = $u.arrayRotate(array, this.counter)
        // increment
        $g[`lscounter_${this._id}`] = this.counter + 1;
        // return
        return rotated[0];
    }
}

// helper functions
function delayRandom (_logTxt) {

    const min = $d.min,
          max = $d.max

    let _rms = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log(_logTxt, _rms)

    return new Promise(resolve => setTimeout(resolve, _rms))
}

function getRandomAmount () {
    
    const min = $c.minCashout,
          max = $c.maxCashout;

    let _randomBtw5e9 = Math.floor(
            Math.random() * (max - min + 1)) + min

    // to multiple of 10
    return Math.round(_randomBtw5e9 / 10) * 10
}

function getRandomRating () {
    const chance = new Chance(),
          _base = [10,10,10,9,9,8];
    return chance.pickone(_base);
}

function getRandomDescription () {

    let _companys = {
        0: {
            id: '23984hhr',
            type: 'purchase',
            transMockId: getNanoid('abcsde123456', 15)
        },
        1: {
            id: 'dh873ht74',
            type: 'other',
            transMockId: getNanoid('ZALSOMKYX12345689', 15)
        },
        2: {
            id: '7643gf3fr',
            type: 'subscription',
            transMockId: getNanoid('ABCDEF2345689', 15)
        },
        3: {
            id: 'ld40k30j4',
            type: 'other',
            transMockId: getNanoid('afdbe123456789', 15)
        },
        4: {
            id: '2873hehhd',
            type: 'other',
            transMockId: getNanoid('cd41294a1dd75637', 15)
        },
        5: {
            id: '03k4frk4f',
            type: 'other',
            transMockId: getNanoid('afdbe123456789', 15)
        },
        6: {
            id: 'okek03k04',
            type: 'other',
            transMockId: getNanoid('00241dd75637', 15)
        },
        7: {
            id: '872gf8dj0',
            type: 'other',
            transMockId: getNanoid('afdbe123456789', 15)
        },
        8: {
            id: 'nbu9898d3',
            type: 'other',
            transMockId: getNanoid('afdbe!123456789', 15)
        },
        9: {
            id: 'qwqwe90d9',
            type: 'subscription',
            transMockId: getNanoid('afdbe123456789', 15)
        },
        10: {
            id: 'd45f4fd45',
            type: 'purchase',
            transMockId: getNanoid('afdbe123456789', 15)
        },
        11: {
            id: 'j4443jf9',
            type: 'other',
            transMockId: getNanoid('afb011dfbc9b5637', 15)
        },
        12: {
            id: 'f503f3qq',
            type: 'other',
            transMockId: getNanoid('abcsde-123456', 15)
        },
        13: {
            id: 'hf9834ee',
            type: 'purchase',
            transMockId: getNanoid('afdbe123456789', 15)
        },
        14: {
            id: 'jf934jf0',
            type: 'other',
            transMockId: getNanoid('afdbe123456789', 15)
        },
        15: {
            id: 'g509gld4',
            type: 'other',
            transMockId: getNanoid('zxcvbnm09874644ew', 15)
        }
    };

    let _comIndex = Math.floor(
            Math.random() * Object.keys(_companys).length)

    let _com = _companys[_comIndex]

    return `&trans=${_com.transMockId}&vendor:${_com.id}&source=${_com.type}`
}

function getNanoid (str, leng, pre = '', suf = '') {
    const nanoid = customAlphabet(str, leng)
    return `${pre}${nanoid()}${suf}`
}

module.exports = {

    setup () {

        global.helpers = {};

        Object.assign(global.helpers, {
            ListRotator,
            getNanoid,
            delayRandom,
            getRandomAmount,
            getRandomRating,
            getRandomDescription
        })
    }
}