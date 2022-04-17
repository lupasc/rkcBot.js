const TelegramBot = require('node-telegram-bot-api')

// short alias for
let $pbot = Bot.prototype = {
    defscope, 
}

function Bot (_name = 'none', 
                _token, 
                    _nops) {

    // _nops = object native telebot init _nops
    // _token = string

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
                return _nops;
            }
        }
    })
}

/* -------------------------- */

function defscope (_name, _defs) {
    // _defs.
}

pbot.prototype.createnBot () {
    return new TelegramBot(_token, _nops)
}

const ttbot = new Bot('dennis', '', {

})

// * -------------------------- */

module.exports = Bot;

