const { ObjectId } = require('mongodb')
const infoSchema = require('../schemas/info.js')
const getMyself = require('../library/getMyself.js')
const genBicoData = require('../library/genBicoData.js')

module.exports = {
    
    '/getAllInfos': {
        
        method: 'get',
        
        handler: async (req, res) => {
        
            console.log('   \n Running route: /getAllInfos')
        
            let _allInfos = await res.$crud('infos', 'find', _objId => {
                return { _ownerId: req.$session._id }
            })
            
            _allInfos = await _allInfos.toArray()

            res.status(200)
                .send(_allInfos)
                    .end()
        }
    },

    '/addManyInfos': {
        
        method: 'post',
        
        handler: async (req, res) => {
            
            console.log('   \n Running route: /addManyInfos')

            let $sess = req.$session,
                _addingInfos = req.body;

            // store valid only
            _addingInfos = _addingInfos.filter(_info => {
                return _info._valid === 'Sim'
            })

            const today = new Date(),
                  yesterday = new Date(today)
                  yesterday.setDate(yesterday.getDate() - 1)

            let _pais = _addingInfos.map(_info => {
                return {
                    ...infoSchema,
                    ..._info,
                    _blockUntil: yesterday.toString(),
                    _hash: '_hash' + new Date().getTime(),
                    _ownerId: $sess._id,
                    // manager only fields
                    _entryDate: new Date().toString(),
                    _live: _info._valid === 'Sim' ? 'Check' : 'Não',
                    _cashout: 'Não'                }
            })
                
            await res.$crud('infos', 'insertMany', () => {
                return _pais
            })

            res.status(200).end()
        }
    },

    '/deleteManyInfos': {
        
        method: 'post',
        
        handler: async (req, res) => {

            console.log('   \n Running route: /deleteManyInfos')

            let   _deletingInfos = req.body,
                  _infosColl = global.mongoDB.collection('infos');

            console.log('_deletingInfos', _deletingInfos)
            
            const _deleteResult = await _infosColl.deleteMany({
                _id: { $in: _deletingInfos.map(_info => {
                    return ObjectId(_info._id)
                })}
            })

            res.status(200).end()
        }
    },

    '/editInfo': {
        
        method: 'post',
        
        handler: async (req, res) => {
            
            console.log('   \n Running route: /editInfo')

            let   editeddInfo = req.body,
                  _infosColl = global.mongoDB.collection('infos');

            const editeddInfoId = editeddInfo._id

            delete editeddInfo._id

            console.log(editeddInfo, editeddInfoId)
            
            const _updateResult = await _infosColl.updateOne({
                _id: ObjectId(editeddInfoId)
            }, { $set: editeddInfo }, { upsert: true })

            res.status(200).end()
        }
    },

    '/getInfo/:id': {
        
        method: 'get',
        
        handler: async (req, res) => {

            console.log('   \n Running route: /getInfo')

            const _gettingInfoId = req.params.id;

            let _gettingInfo = await res.$crud('infos', 'findOne', _objId => {
                return { _id:  _objId(_gettingInfoId)}
            })

            if (_gettingInfo) {
                res.status(200)
                    .send(_gettingInfo)
                        .end()
            }
        }
    },

    '/deleteInfo/:id': {
        
        method: 'post',
        
        handler: async (req, res) => {

            console.log('   \n Running route: /deleteInfo')

            let   _deletingInfoId = req.params.id,
                  _infosColl = global.mongoDB.collection('infos');

            console.log('_deletingInfoId', _deletingInfoId)
            
            const _deleteResult = await _infosColl.deleteOne({
                _id: ObjectId(_deletingInfoId) 
            })

            res.status(200).end()
        }
    },

    '/genSetCustomer': {
        
        method: 'post',
        
        handler: async (req, res) => {
            
            console.log('   \n Running route: /genSetCustomer')

            let   $info = req.body,
                  $infosColl = global.mongoDB.collection('infos');

            const _infoId = $info._id,
                  _cus = genBicoData();

            delete $info._id

            let $attInfo = { ...$info, _cus }

            console.log($attInfo, _infoId)
            
            await $infosColl.updateOne({
                _id: ObjectId(_infoId)
            }, { $set: $attInfo }, { upsert: true })

            res.status(200).end()
        }
    },
}