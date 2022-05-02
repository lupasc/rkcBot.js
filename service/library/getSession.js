const jwt = require('jsonwebtoken')

function getSession (req) {
    
    let _userToken = req.headers.authorization;

    if (_userToken) {
        _userToken = _userToken.split(' ')

        let _session = jwt.verify(_userToken[1], 'exuah')
    
        return _session;
    }
}

module.exports = getSession