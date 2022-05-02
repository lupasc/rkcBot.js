const request = require("request")

let $e = process.env,
    $g = global,
    $c = $g.confs;

async function proxyNativeControl (req, res) {

    // Pipe is through request, this will just redirect
    // everything from the api to your own server at localhost.
    // It will also pipe your queries in the url

    let $px = global.pickOneProxy('usual'),
        $rt = req.url,
        $skey,
        $ua;
        
      const routeMap = {
            /////////////
            pk: ['/tokens'],
            sk: ['/changes'],
            /////////////////
            front: ['/tokens'],
            server: ['/changes'],
            /////////////////////
            default: ['sk', 'server', 'usual']
      }

    if (routeMap.pk.includes($rt)) {
        $skey = global.pickOneSkey('pk')
    } else if (routeMap.sk.includes($rt)) {
        $skey = global.pickOneSkey('sk')
    } else { // else is sk
        $skey = global.pickOneSkey(routeMap.default[0])
    }

    if (routeMap.front.includes($rt)) {
        $ua = global.pickOneUA('front')
        $px = global.pickOneProxy('usual')
    } else if (routeMap.server.includes($rt)) {
        $ua = global.pickOneUA('server')
        $px = global.pickOneProxy('server')
    } else { // else is server
        $ua = global.pickOneUA(routeMap.default[1])
        $px = global.pickOneProxy(routeMap.default[2])
    }

    console.log('\n', '$px', $px)
    console.log('$skey', $skey)
    console.log('$rt', $rt)
    console.log('$ua', $ua, '\n')

    req.pipe(request({
        uri: config.apiUrl + req.url,
        proxy: $px,
        headers: {
            'Keep-Alive': 'true',
            'User-Agent': $ua,
            'Authorization': 'Bearer ' + $skey
        }

    })).pipe(res, { end: true })
}

module.exports = proxyNativeControl;