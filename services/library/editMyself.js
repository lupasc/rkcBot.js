const { ObjectId } = require('mongodb')

function editMyself (_session) {

    const _usersColl = global.mongoDB.collection('users')

    return {

        subtractCredits (amount, _cb) {

            return {
                
                incChecksCount () {
                    _main('checksCount')
                },

                incGeneratesCount () {
                    _main('generatesCount')
                }
            }

            function _main (_incProp) {

                _usersColl.updateOne(
            
                    { _id: ObjectId(_session._id) }, 
                    
                    { 
                        $inc: { 
                            credits: -amount,
                            [_incProp]: amount
                        }
                    }, 

                _mongoCb)
            }

            async function _mongoCb (_err, doc) {
                 
                 if (_err) {
                    await _cb(_err, doc)
                 } else {
                    await _cb(null, doc)
                 }
            }
        }
    }
}

module.exports = editMyself;