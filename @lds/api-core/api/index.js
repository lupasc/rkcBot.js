const Chance = require('chance')
const UserAgent = require('user-agents')

let $e = process.env,
    $g = global,
    $c = $g.confs,
    $u = $g.util,
    $h = $g.helpers,
    $plist = $g.plist;


function pickUserAgent (svOrClt) {

    if ($e.DEP_MODE === 'test') {
        if (svOrClt === 'client') return $e.UA_CLIENT_TEST
        if (svOrClt === 'server') return $e.UA_SERVER_TEST
    } 

    if ($e.DEP_MODE === 'live') {
        if (svOrClt === 'client') return new UserAgent().data.userAgent
        if (svOrClt === 'server') return $e.UA_SERVER_LIVE
    }
}

module.exports = {

    setup () {

        Object.assign(global, {
            pickUserAgent,
            pickProxy: require('./pickProxy.js'),
            genBicoData: require('./genBicoData.js'),
            parseCheckError: require('./parseCheckError.js'),
            proxyNativeControl: require('./proxyNativeControl.js')
        })
    }
}