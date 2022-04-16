require("dotenv").config()
require('./util.js')

/////////////////////////////
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const { RateLimiterMemory } = require('rate-limiter-flexible');

////////////////////////////
const errors = require('./errors.js')
const indexRouter = require('./router.js')
const mongoCrud = require('./library/mongoCrud.js')
const getMyself = require('./library/getMyself.js')
const getSession = require('./library/getSession.js')
const resolveDatabase = require('./library/resolveDatabase.js')
const config = require('./config.js')

// env vars sct
let $e = process.env;

var app = express(),
    rateLimiter = new RateLimiterMemory(config.rateLimit)

setapp()

async function setapp () {

    console.log('\n   * Starting back', 
            '"' + process.env.NODE_ENV + '"')
    console.log('   * spipeURL:', config.spipeURL)

    global.$knError = { ...errors }

    await resolveDatabase()
    
    console.log('   \n   - Succesfully MongoDB connected.\n')

    // Firstly!
    app.use(cors({ origin: '*'}))

    // view engine setup
    app.set('view engine', 'jade')
    app.set('trust proxy', true)

    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(rateLimitCallback)

    app.use((req, res, next) => {
        req.$session = getSession(req)
        res.$crud = async (_collName, _methName, _query, _res = res) => {
            return await mongoCrud(_collName, 
                            _methName, 
                        _query, 
                    _res)
        }; next();
    })

    // main and single router
    app.use('/services', indexRouter)

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404))
    })

    // error handler
    app.use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}
        if (err.status === 404) {
            res.redirect('/app')
        } else {
            // send the error status
            res.status(err.status || 500)
        }
    })

    console.log('   ...app was succesfully setup!\n')

    if (process.env.NODE_ENV === 'deployment') {
        if (process.env.DEP_LOG === 'false') {
            console.log = (...args) => {}
        }
    }
}

function rateLimitCallback (req, res, next) {
    
    if ($e.RATE_LIMIT !== 'enable') {
        next()
    } else {
        rateLimiter
            .consume(req.connection.remoteAddress)
            .then(() => {
                next()
            }).catch(() => {
                res.status(429)
                        .send('Too Many Requests')
                            .end()
            })
    }
}

module.exports = app
