function genSKs (count) { 

    const _0x392b=['length','floor','7uaLcfI','1CxxWwB','sk_live_','random','373127TdXzjp','#sklist','1809175nievNe','809443mzREAL','194555uTqdvi','charAt','1203300Qnpenj','ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789','475842APvzbO','1RGIInM','433441AIFDDH'];const _0x3985=function(_0x18e690,_0xf9e3a9){_0x18e690=_0x18e690-0xe0;let _0x392b69=_0x392b[_0x18e690];return _0x392b69;};(function(_0x3ec103,_0x2a8665){const _0x134763=_0x3985;while(!![]){try{const _0x1c64c6=-parseInt(_0x134763(0xeb))+-parseInt(_0x134763(0xe7))+parseInt(_0x134763(0xea))*-parseInt(_0x134763(0xe1))+parseInt(_0x134763(0xe9))+-parseInt(_0x134763(0xe4))+-parseInt(_0x134763(0xe5))*-parseInt(_0x134763(0xee))+parseInt(_0x134763(0xe3))*parseInt(_0x134763(0xef));if(_0x1c64c6===_0x2a8665)break;else _0x3ec103['push'](_0x3ec103['shift']());}catch(_0x3972a8){_0x3ec103['push'](_0x3ec103['shift']());}}}(_0x392b,0xca0c7));function genSkKey(){const _0x1c1d61=_0x3985;let _0x3f21f6='36',_0x3956c5='',_0x120109=_0x1c1d61(0xe8),_0x5bcbd1=_0x120109[_0x1c1d61(0xec)];for(let _0x54c579=0x0;_0x54c579<_0x3f21f6;_0x54c579++){_0x3956c5+=_0x120109[_0x1c1d61(0xe6)](Math[_0x1c1d61(0xed)](Math[_0x1c1d61(0xe0)]()*_0x5bcbd1));}return _0x1c1d61(0xf0)+_0x3956c5;}function generateSK(_0x25e82d){const _0x1d4010=_0x3985;$(_0x1d4010(0xe2))['text'](genSkKey());}

    let h = []

    for (let i = 0, lng = count; i < lng; i++){
        h.push(genSkKey())
    }

    h = h.join(`\n`)

    return h
}