const emap           = require('./emap.js')
const plist          = require('./plist.js')
const solveDelays    = require('./solveDelays.js')
const solveStripeAcc = require('./solveStripeAcc.js')

const $e = process.env,
      $g = global,
      $u = $g.util;

// -> inner Server > Server auth
const users = { 
    'ACCESS_KEY': $e.ACCESS_KEY 
}

module.exports = {

    setup () {

        Object.assign(global, {
            // stripe error codes 
            // for handling on controls.js
            emap, 
            // proxy list settings
            plist, 
            // main settings
            confs: { 
                apiUrl:          'https://api.stripe.com/v1',
                auth:            { users },
                stripeAcc:       solveStripeAcc(),
                delays:          solveDelays(),
                port:            $e.PORT || 3000,
                accessKey:       $e.ACCESS_KEY,
                depMode:         $e.DEP_MODE,
                depLogs:         $e.DEP_LOG,
                minCashout:      Number($e.MIN_CASHOUT),
                maxCashout:      Number($e.MAX_CASHOUT),
                addspChance:     Number($e.ADDR_SP_CHANCE),
                checkFlvChance:  Number($e.CHECK_FLV_CHANCE)
            }
        })
    }
}