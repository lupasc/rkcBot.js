const { setconfs } = require('./confs.js'),
      { settexts } = require('./texts.js');

function setup () {
    setconfs();
    settexts();
}

exports.setup = setup;