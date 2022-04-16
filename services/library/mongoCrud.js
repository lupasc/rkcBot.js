const { ObjectId } = require('mongodb')

let ERRORS = require('../errors.js')

async function mongoCrud (_collName, _methName, _queryFunc, res) {
    
    try {
        
        let _coll = global.mongoDB.collection(_collName);
        
        return await _coll[_methName](_queryFunc(_safeObjectID))

    } catch (_err) {
        
        _sendErrors(_err)

        return false
    }

    function _safeObjectID (_idString) {
    
        try {
            return new ObjectId(_idString)
        } catch (_err) {
            _sendErrors(_err) 
        }
    }

    function _sendErrors (__err) {
            
        console.log('Fail at $mongoCrud:')
        console.log('collection:', _collName)
        console.log('method:', _methName)
        
        console.error(__err)

        if (res) {
            res.status(ERRORS._mongoCrudFail.code)
                .send({...ERRORS._mongoCrudFail, error: __err})
                    .end()
        }
    }
}

module.exports = mongoCrud