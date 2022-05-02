const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { ObjectId } = require('mongodb')
const getMyself = require('../library/getMyself.js')

module.exports = {
    
    '/sessionLoggingUser': {
        
        method: 'post',
        
        handler: async (req, res) => {

            console.log('   \n Running route: /sessionLoggingUser')

            const _userLogging = req.body,
                  _usersColl = global.mongoDB.collection('users');

            console.log('_userLogging', _userLogging)

            try {

                let _user = await _usersColl.findOne({ name: _userLogging.name }),
                    token;

                if (_user) {

                    token = jwt.sign({
                        _id: _user._id, 
                        name: _user.name,
                        settings: _user.settings
                    }, 'exuah')

                    const _userPasswordMatch = await bcrypt.compare(
                            _userLogging.password, 
                                _user.password)

                    if (_userPasswordMatch) {
                        
                        if (!_user.tokens) _user.tokens = []
                        
                        _user.tokens = _user.tokens.concat({ token })
                        
                        res.status(200)
                                .json({token})
                                    .end()
                    }
                
                } else {
                    res.status(404).send('User not found').end()
                }

            } catch (err) {
                console.error('Fail at route /sessionLoggingUser:', err)
                res.status(501).send('Fail at route /sessionLoggingUser: ' + err).end()
            }
        }
    },


    '/getMyself': {
        
        method: 'get',
        
        handler: async (req, res) => {

            console.log('   \n Running route: /getMyself')

            let $sess = req.$session,
                $myself = await getMyself(res, $sess)

            if ($myself) {
                res.status(200)
                    .send($myself)
                        .end()
            }
        }
    },

    '/updatePassword': {

        method: 'post',

        handler: async (req, res) => {

            console.log('   \n Running route: /updatePassword')

            let  _data = req.body,
                 _usersColl = global.mongoDB.collection('users');

            let newPass = await bcrypt.hash(_data.newPassword, 3)
            
            const _updateResult = await _usersColl.updateOne({
                _id: ObjectId(_data.userID)
            }, { $set: { password: newPass } }, { upsert: true })

            res.status(200)
                    .send(_updateResult)
                            .end()
        }
    }

     /////////////////////////////////////////////////////////////////////////
    /// ------------------------ * obsolete * -------------------------- ////
   /////////////////////////////////////////////////////////////////////////
}