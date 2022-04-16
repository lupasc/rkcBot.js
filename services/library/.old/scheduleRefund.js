const makeStripe = require('./makeStripe.js')
const config = require('../config.js')

// Stripe instance with SK
const $stripe = makeStripe();

function scheduleRefund (_chargeID) {

    let _delay = _delayRandom(_chargeID)

    console.log('   - Scheduleding refund within:', _delay)
    console.log('   - Charge ID: ', _chargeID)

    setTimeout(async () => {
        
        try {
            
            await $stripe.refunds.create({
              charge: _chargeID
            })

            console.log('   - Just refounded charge: ', _chargeID)

        } catch (_err) {
            console.log('Fail at scheduleRefund, charge:', _chargeID)
            console.error(_err)
        }

    }, _delay)
}

module.exports = scheduleRefund;

// helper functions
function _delayRandom () {

    const min = config.minRefundDelay,
          max = config.maxRefundDelay

    let _rms = Math.floor(Math.random() * (max - min + 1)) + min;

    return _rms;
}