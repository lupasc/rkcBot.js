const { faker } = require('@faker-js/faker')
const { generate } = require('gerador-validador-cpf')

let $g = global,
    $c = $g.confs;

faker.locale = 'pt_BR'

function genBicoData () {

    let   firstName = faker.name.firstName(),
          midName = faker.name.lastName(),
          lastName = faker.name.lastName(), 
          cpf = _genValidCPF(),
          name = firstName + ` ${midName} ` + lastName,
          email = faker.internet.email(firstName, midName),
          address = faker.address.streetAddress(true),
          phone = faker.phone.phoneNumber('(##) #####-####'),
          city,
          state,
          stateAbbr,
          cep;

    // icreases chances to
    // set SP address
    // it matches more in BR
    $g.util
        .maybe($c.chanceAddrsp, {

            do () {
                console.log('   ...forcing SP address.')
                city = 'São Paulo';
                state = 'São Paulo';
                stateAbbr = 'SP';
                cep = faker.address.zipCodeByState(stateAbbr);
            },

            dont () {
                console.log('   ...better not forcing SP address.')
                city = faker.address.city();
                state = faker.address.state();
                stateAbbr = faker.address.stateAbbr();
                cep = faker.address.zipCodeByState(stateAbbr);
            }
        })

    return {
        _gen: true,
        holdername: name.toUpperCase(),
        email: email.toLowerCase(),
        country: 'BR',
        cpf,
        name,
        cep,
        city: city.replace('undefined', ''),
        state,
        stateAbbr,
        address,
        phone,
        extraInfo: ''
    }
}

// export main
module.exports = genBicoData

// helpers
function _genValidCPF () {
    
    let _cpgen;

    while (!_cpgen) {
        _cpgen = generate()
    }

    return _cpgen
}