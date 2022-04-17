
function Bot (_token, _ops) {

    // * _ops = object native telebot init _ops
    // * _token = string

    Object.defineProperties(this, {
        
        'token': {
            writeable: false,
            enumerable: false,
            configurable: true,
            
            get () {
                return _token;
            }
        },  

        'options': {            
            writeable: false,
            enumerable: true,
            configurable: true,
            
            get () {
                return _ops;
            }
        }
    })
}

module.exports = Bot;
// --------------- //

function defscope (_name, _ops) {

    // * 

}