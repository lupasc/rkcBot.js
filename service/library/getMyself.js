async function getMyself (res, _session) {
    
    let _myself = await res.$crud('users', 'findOne', _objId => {
        return { _id:  _objId(_session._id)}
    })

    if (_myself) {
        delete _myself.password;
        return _myself;
    }

    return {}
}

module.exports = getMyself