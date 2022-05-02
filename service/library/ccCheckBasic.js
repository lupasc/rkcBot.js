const ccheck = require('creditcard.js')

function ccCheckBasic (ccObj) {
    
    let cnum = ccheck.isValid(ccObj.number),
        cexp = ccheck.isExpirationDateValid(ccObj.month, ccObj.year),
        ccvv = ccheck.isSecurityCodeValid(ccObj.number, ccObj.cvv);

    if (cnum && cexp && ccvv) {
        return {
            error: null,
            valid: true
        }
    }

    let erres = {
        valid: false,
        error: ''
    }

    let errors = []

    if (!cnum) errors.push('Number')
    if (!cexp) errors.push('Date')
    if (!ccvv) errors.push('CVV')

    erres.error = errors.join(', ')

    return erres;
}

module.exports = ccCheckBasic