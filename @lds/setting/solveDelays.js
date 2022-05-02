let $e = process.env,
    $g = global,
    $c = $g.confs;

const $b = {
    rate: '1x',
    min: 500, 
    max: 1000,
    greq: 500
}

function solveDelays () {

    let delays = {},
        rate = $e.DELAY_RATE;

    return _solveCalcs(Number(rate))

    function _solveCalcs (rate) {
        return {
            rate: `${rate}x`,
            min:  $b.min   * rate,
            max:  $b.max   * rate,
            greq: $b.greq  * rate
        }
    }
}

module.exports = solveDelays;