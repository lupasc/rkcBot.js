let E = process.env;

const ssapiHost = {
    remote: 'spipe.herokuapp.com',
    local: 'localhost:3000'
}

const authData = {
    username: 'ACCESS_KEY',
    password: E.ACCESS_KEY
}

let config,
    configs = {

    development: {
        
        mongoURL: 'mongodb+srv://bet:tal4@cluster0.ze6wn.mongodb.net/pnsPekcehc?retryWrites=true&w=majority',
        ssapiHost: ssapiHost.local,
        authData,
        port: 3500,
        
        delay: {
            genCustomer: {
                max: 2000,
                min: 500
            }
        },

        rateLimit: {
            points: 12, // 5 points
            duration: 1, // Per second
            blockDuration: 30 // sec. block for 30sec if more than points consumed 
        }
    },

    deployment: {
        
        mongoURL: 'mongodb+srv://dan:bilz1@cluster0.ub7z0.mongodb.net/pnsPekcehc?retryWrites=true&w=majority',
        ssapiHost: ssapiHost.remote,
        authData,
        port: undefined,
        
        delay: {
            genCustomer: {
                max: 6000,
                min: 3500
            }
        },

        rateLimit: {
            points: 6, // 5 points
            duration: 1, // per second
            blockDuration: 60 // sec. block for 1 minute if more than points consumed 
        }
    }
}

if (process.env.NODE_ENV === 'deployment') {
    config = configs.deployment
    config.spipeURL = `https://${config.ssapiHost}/service`
}

if (process.env.NODE_ENV === 'development') {
    config = configs.development
    config.spipeURL = `http://${config.ssapiHost}/service`
}


module.exports = config;