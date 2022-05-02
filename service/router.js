const express = require('express')
const router = express.Router()

let controls = require('./controls/index.js')
    
console.log(controls)   

for (let _key in controls) {
     let _ctr = controls[_key]
     router[_ctr.method](_key, _ctr.handler)
}

module.exports = router;