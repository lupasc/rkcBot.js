const { faker } = require('@faker-js/faker')
const { generate } = require('gerador-validador-cpf')

faker.locale = 'pt_BR'

function genMetaData () {



    let meta = {
        

        
        trans: {
            name: '',
            comment: '',
            rating: 5,
            uid: faker.internet.password(8),
            sps: '',
            spscusuid: ''
        }
    }
}

// exports main
module.exports = genMetaData