
function Bot (_name = 'none', 
                _token, 
                    _ops) {

    // * _ops = object native telebot init _ops
    // * _token = string

    this.name = _name;
    this.uid  = $g.u.genUid();

    Object.defineProperties(this, {
        
        'odf_token': {
            writeable: false,
            enumerable: false,
            configurable: true,
            
            get () {
                return _token;
            }
        },

        'odf_options': {            
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

// * -------------------------- *

function defscope (_name, _ops) {

    // * _ops.

}