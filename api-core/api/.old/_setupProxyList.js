const axios = require('axios')

let $e = process.env,
    $g = global,
    $p = $g.$p;

async function setupProxyList () {

    return new Promise((resolve, reject) => {

        console.log('   ...fetching plist.')
        console.log('$e.PXSV_PLIST_URL', $e.PXSV_PLIST_URL)

        global.proxyListClient = $p.clientSide
        
        axios({

            method: 'get',
            url: $e.PXSV_PLIST_URL,
            headers: { 'Authorization': $e.PXSV_KEY }
        
        }).then(res => {

            console.log('   > res.data', res, '\n')
            console.log('   - plist fetched.')

            let toarr = res.data.split('\n')

            let proxylist = $g.proxyList = toarr.filter(ps => {
                return !ps.includes($e.PROXY_SERVER_GROUP)
            })

            let proxylistsv = toarr.filter(ps => {
                return ps.includes($e.PROXY_SERVER_GROUP)
            })

            $g.util.shuffleArray(proxylist)
            $g.util.shuffleArray(proxylistsv)

            $g.proxyList = proxylist;
            $g.proxyListSV = proxylistsv;

            if ($g.proxyList.length === 0 &&
                    $g.proxyListSV.length === 0) {
                throw Error('Some proxy list empty')
            }

            resolve(true)

        }).catch(err => {
            
            console.log('   - plist rejected.')
            console.error(err)

            throw reject(err)
        })
    })
}

module.exports = setupProxyList;