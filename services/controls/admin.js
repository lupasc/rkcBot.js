const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { ObjectId } = require('mongodb')
const getMyself = require('../library/getMyself.js')

module.exports = {

    '/admin/getAllUsers': {
        
        method: 'get',
        
        handler: async (req, res) => {
    
            console.log('   \n Running route: /admin/getAllUsers')
            
            let $allUsers = await res.$crud('users', 'find', () => {})
                $allUsers = await $allUsers.toArray()

            res.status(200)
                .json($allUsers)
                    .end()
        }
    },

    '/admin/newUserAccount': {
        
        method: 'post',
        
        handler: async (req, res) => {

            console.log('   \n Running route: /admin/newUserAccount')
            
            let $sess = req.$session,
                $myself = await getMyself(res, $sess),
                $addingUser = req.body;

            // -> First checks whether user already exists
            // -> handles final error itself let it be
            let $existUser = await res.$crud('users', 'findOne', () => {
                return { name: $addingUser.name }
            })
            
            if (!$existUser) {

                delete $addingUser._id
            
                $addingUser._hash = '_hash' + new Date().getTime()
                $addingUser.password = await bcrypt.hash($addingUser.password, 3)

                let _usersColl = global.mongoDB.collection('users'),
                    _insertResult = await _usersColl.insertOne($addingUser)
                    
                $addingUser._id = _insertResult.insertedId

                res.status(200)
                    .send($addingUser)
                        .end()
            
            } else {
                res.status(401)
                    .send({error: 'User name already exists.'})
                        .end()
            }
        } 
    },

    '/admin/updateUser': {
        
        method: 'post',
        
        handler: async (req, res) => {

            console.log('   \n Running route: /admin/updateUser')
            
            let $sess = req.$session,
                $myself = await getMyself(res, $sess),
                $updatedUser = req.body;

            const _usersColl = global.mongoDB.collection('users'),
                  _userID = $updatedUser._id;

            delete $updatedUser._id
            
            let _updateResult = await _usersColl.updateOne({
                _id: ObjectId(_userID)
            }, { $set: $updatedUser }, { upsert: true })

            res.status(200)
                    .send(_updateResult)
                            .end()
        }
    },

    '/admin/deleteUser/:id': {
        
        method: 'post',
        
        handler: async (req, res) => {

            console.log('   \n Running route: /admin/deleteUser')

            const $sess = req.$session;

            if ($sess._role !== 'master') {
                res.status(401).end()
                return
            }

            let $deletingUserId = req.params.id,
                $usersColl = global.mongoDB.collection('users');

            console.log('$deletingUserId', $deletingUserId)
            
            const _deleteResult = await $usersColl.deleteOne({
                _id: ObjectId($deletingUserId) 
            })

            console.log('_deleteResult', _deleteResult)

            res.status(200)
                    .send(_deleteResult)
                        .end()
        }
    },

    '/admin/updatePassword': {

        method: 'post',

        handler: async (req, res) => {

            console.log('   \n Running route: /admin/updatePassword')

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
    },

     //////////////////////////////////////////////////////////////////////////
    //// ------------------------ * obsolete * -------------------------- ////
   //////////////////////////////////////////////////////////////////////////
}