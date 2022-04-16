const { ObjectId } = require('mongodb')
const axios = require('axios')
const Plan = require('../library/Plan.js')
const config = require('../config.js')
const getMyself = require('../library/getMyself.js')
const editMyself = require('../library/editMyself.js')
const genBicoData = require('../library/genBicoData.js')
const spipeRequest = require('../library/spipeRequest.js')
const ccCheckFingerprint = require('../library/ccCheckFingerprint.js')
const ccCheckBlacklist = require('../library/ccCheckBlacklist.js')
const ccCheckRequestMany = require('../library/ccCheckRequestMany.js')

let $g = global;

let main = {
    
    '/checkParseMany': {
        
        method: 'post',
        
        async handler (req, res) {

            let $sess = req.$session,
                $myself = await getMyself(res, req.$session),
                $ccTextArray = req.body;

            let $plan = new Plan($myself.currentPlan)

            // -> console.log('$plan', $plan)
            // -> console.log('$myself', $myself)
            // -> console.log('$ccTextArray', $ccTextArray)

            if ($plan.status === 'Expirado  ❌') {
                res.status(406)
                    .send({error: 'Plano expirado: Renovação necessária.'})
                        .end(); return
            }

            if ($myself.credits < $ccTextArray.length) {
                res.status(403)
                    .send({message: 'Créditos insuficientes.'})
                            .end(); return
            }


            let _infosCheck = await ccCheckRequestMany($ccTextArray, $sess)

            if (_infosCheck.error) {

                console.error('Fail at checkParseMany', _infosCheck.error)
                
                res.status(_infosCheck.error.code)
                    .send(_infosCheck.error)
                        .end()
            }

            if (!_infosCheck.error) {

                editMyself($sess)
                    .subtractCredits($ccTextArray.length, () => {
                        
                        res.status(200)
                            .send(_infosCheck.data)
                                .end() 
                            
                                    }).incChecksCount()
            }
  
        }
    },

    '/checkParseLive': {
        
        method: 'post',
        
        async handler (req, res) {

            console.log('   ...running /checkParseLive', '\n')

            let $info = req.body,
                $sess = req.$session;
                
            // 1) if already checked on itself
            // > @start ------------------------- >>

            if ($info._live !== 'Check') {
                
                console.log('   *  $info Already Checked.')
                console.log('   ...responding ERROR 403 without check API.\n')
                
                res.status(403)
                    .send({error: 'AlreadyChecked'})
                        .end(); return;

            } // * @end ------------------------- ||

            // 2) if theres another cc including $info.number
            // ...on the whole collection, its a fingerprint 
            // returns a copy of this found FP with new id and ownerid
            // > @start ------------------------- >>
            
            let $fpinfo = await ccCheckFingerprint($info)
                        
            if ($fpinfo) {
                
                console.log('    *  $fpinfo found.')
                console.log('    ...sending clone result without check API.\n')
                
                $fpinfo._id = ObjectId($info._id);
                $fpinfo._ownerId = $info._ownerId;
                
                res.status(200)
                    .send($fpinfo)
                        .end(); return;

            } // * @end ------------------------- || 


            // 3) if theres another cc including $info.number
            // ...on the whole collection, its a fingerprint 
            // returns a copy of this found FP with new id and ownerid
            // > @start ------------------------- >>
            
            let $blinfo = await ccCheckBlacklist($info)
                        
            if ($blinfo) {
                
                console.log('    *  $blinfo found.')
                console.log('    ...sending clone result without check API.\n')
                
                $blinfo._id = ObjectId($info._id);
                $blinfo._ownerId = $info._ownerId;
                $blinfo._live = 'Não'
                $blinfo._errorLive = 'inner_blacklist'

                res.status(200)
                    .send($blinfo)
                        .end()

            } // * @end ------------------------- || 

            // 4) doesn't match any filter above
            // - its a new cc number in whole db
            // - its not already checked itself
            // ...then performs spipe request.
            // > @start ------------------------- >>

            try {

                console.log('    *  $info suits to check.')
                console.log('    ...performing request to spipe API.\n')

                let $chkout = await spipeRequest
                        .post('/fastCheckout', {
                            ...$info }), 
                    
                    // shortcut deffs
                    $psinfo = $chkout.data;

                if ($psinfo._errorEscape) {
                    
                    console.log('    *  check signal: ESCAPE')
                    console.log('    ...responding known ._errorEscape:', 
                                                    $psinfo._errorEscape, '\n')

                    res.send({error: $psinfo._errorEscape }).end();
                
                } else {

                    console.log('    *  successfully checked and parsed...')
                    console.log('    ...sending $psinfo:', $psinfo, '\n')

                    res.status(200)
                        .send($psinfo)
                            .end()
                }

            } catch (error) {
                
                console.log('   * Fail at spipeRequest()')
                console.error('     - Unknown ERROR:', error, '\n')
                
                res.status(405)
                        .send({error})
                            .end()

            } // * @end --------------------------- || 
        }
    },

    '/getOneCustomer': {
        
        method: 'get',
        
        async handler (req, res) {

            console.log('   - Running /getCustomerGG...')
            console.error(' ...service currently inactive.')
            return;
            
            let $customer = genBicoData();

            console.log('config.delay.genCustomer', config.delay.genCustomer)

            await $g.util
                    .delayRandom(
                        config.delay.genCustomer, 
                            'Getting customerGG within:');

            res.status(200)
                .send($customer);
        }
    }
}

module.exports = {
    ...main,
    ...require('./users.js'),
    ...require('./infos.js'),
    ...require('./admin.js')
}