const moment = require('moment')

function Plan ($p) {
    
    this.name = _planObjToText($p)
    this.status = _checkPlanStatus($p)

    return Object.assign(this, $p)
}

function _planObjToText (p) {
    return `${p.icon} ${p.days} dias | ${p.credits} chk | $${p.price}`
}

function _checkPlanStatus (p) {
    
    let now = moment(),
        start = moment(p.startAt),
        expire = moment(start).add('days', p.days);

    return now.isBefore(expire) ? 'Ativo  ✅' : 'Expirado  ❌'
}

module.exports = Plan