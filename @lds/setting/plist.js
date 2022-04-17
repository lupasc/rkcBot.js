let $e = process.env;

const plist = {

    live: {
        
        clientSocks5: [`socks5://${$e.PXYFUEL_USR}:${$e.PXYFUEL_PSW}@gate2.proxyfuel.com:3000`],
        
        client: [`http://${$e.PXYFUEL_USR}:${$e.PXYFUEL_PSW}@gate2.proxyfuel.com:2000`],
        
        server: [ 
            `http://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@157.52.155.35:60099`,
                `http://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@157.52.155.44:60099`,
                    `http://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@157.52.155.5:60099` ]
    },


    test: {

        clientSocks5: [ 
            `socks5://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@172.85.98.46:61336`,
                `socks5://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@172.85.98.51:61336`,
                    `socks5://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@172.85.98.76:61336` ],
        client: [ 
            `http://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@172.85.98.46:60099`,
                `http://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@172.85.98.51:60099`,
                    `http://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@172.85.98.76:60099` ],

        server: [ `http://${$e.RSOCKS_USR}:${$e.RSOCKS_PSW}@213.156.143.163:1490` ]
    }
}

if ($e.DEP_MODE === 'live') {
    module.exports = { 
        core: plist,         
        client: $e.CLIENT_SOCKS5 === 'enable' ? plist.live.clientSocks5 : plist.live.client, 
        server: plist.live.server
    }
}

if ($e.DEP_MODE === 'test') {
    module.exports = { 
        core: plist, 
        client: $e.CLIENT_SOCKS5 === 'enable' ? plist.test.clientSocks5 : plist.test.client,
        server: plist.test.server 
    }
}