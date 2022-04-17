let $e = process.env;

const stripeAcc = {

    name: 'doncart',
    domain: 'doncart.herokuapp.com',
    url: 'https://doncart.herokuapp.com/',

    test: {
        sk: $e.SK_TEST,
        pk: $e.PK_TEST
    },

    live: {
        sk: $e.SK_LIVE,
        pk: $e.SK_LIVE
    }
}

function solveStripeAcc () {
    if ($e.DEP_MODE === 'test') {
        return {
            name: stripeAcc.name,
            domain: stripeAcc.domain,
            url: stripeAcc.url,
            ...stripeAcc.test
        }
    }

    if ($e.DEP_MODE === 'live') {
        return  {
            name: stripeAcc.name,
            domain: stripeAcc.domain,
            url: stripeAcc.url,
            ...stripeAcc.live
        }
    }    
}

module.exports = solveStripeAcc;

