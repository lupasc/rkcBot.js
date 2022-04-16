const express = require('express')
const router = express.Router()
const controls = require('./controls.js')

console.log('   - controls: ', controls)

for (let _key in controls) {
     let _ctr = controls[_key]
     router[_ctr.method](_key, _ctr.handler)
}

module.exports = router;