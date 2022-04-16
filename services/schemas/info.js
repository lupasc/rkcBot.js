var infoSchema = {
    
    // (1) CC props <-------------------------------------*
    // - Props set on front-end
    // - Then sent TO /checkParseMany
    number: '',
    month: '',
    year: '',
    cvv: '',

    // (2) Bin checking props <---------------------------*
    // - Props set ON /checkParseMany
    // - Then SENT BACK to front-end
    // - Ready to store on /addManyInfos
    level: '',
    type: '',
    card: '',
    bank: '',
    country: '',
    _valid: '', // Não | Sim
    _errorValid: null, // or String

    // (3) Storing props <--------------------------------*
    // - Props set when info obj is stored on /addManyInfos
    // _id: '',
    _hash: '',
    _entryDate: '',
    _ownerId: '',

    // (4) Live checking props <--------------------------*
    // - Props set on /checkParseLive
    _fingerprint: null,
    _chargeid: null, // or String
    _errorLive: null, // or String
    _errorEscape: null, // or String

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // *-----------------------------------------> Specials <-----------------------------------------* //
    //////////////////////////////////////////////////////////////////////////////////////////////////////

    // (3 & 4) <----------------------------------------------*
    // - Firstly set by (3) 
    // - Then may be changed by (4)
    _live: '', // Check | Não | Sim | Talvez
    _cashout: '', // Não | Sim | Number(any)

    // (4 & 5) Customer Object <------------------------------*
    // - Props set on /genSetCustomer...
    // - or /checkParseLive (if there inst yet - no .name)
    _cus: {
        _gen: false, // or true
        name: null, // or String (starts as null in order to check if _cus exists applicable for front)
        holdername: '',
        email: '',
        country: '',
        cpf: '',
        cep: '',
        city: '',
        state: '',
        stateAbbr: '',
        address: '',
        phone: '',
        extraInfo: ''
    },

    // (6) <--------------------------------------------------*
    // set manually on db 
    // set on infoCheckLive
    // - if status is true 
    // - calcs startAt date against days & curr date
    // ...in order to 
    _blockUntil: '',

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // *-------------------------------------> Manuals & Defaults <-----------------------------------* //
    //////////////////////////////////////////////////////////////////////////////////////////////////////

    _status: 'Novo', // Novo | Vendido | Usando
    _balance: 0, // Number
    _password: '',
    _consultable: 'Não' // Não, Sim
}

// Exports...
module.exports = infoSchema;