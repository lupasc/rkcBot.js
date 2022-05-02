const blacklist = require('../blacklist.js')

function ccCheckBlacklist (ccObj) {
    
    if (blacklist.includes(ccObj.number)) {
        return { ...ccObj}
    }

    return false
}

module.exports = ccCheckBlacklist