let E = process.env;

let $conf = {
    mode: E.MODE || 'test',
    clog: E.CLOG || 'true',
	botk: E.BOTK || 'null'
}

function setconfs () {
    Object.assign(global, {
        $conf
    })
}

exports.setconfs = setconfs;