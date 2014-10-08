
var fs = require('fs');
var pattern = require('./pattern.js');

var share = {
  src: null,
  tuple: null,
  c_row: 0,
  c_col: 0,
  s_row: 0,
  s_col: 0
};

function scan(src) {
  skip_space(share);
  var tuple = share.tuple = genTuple(null, null, null, false);
        // digit
  share.tuple = pattern.getDigit(share) ||
        // string
        pattern.getString(share) ||
        // reserve
        pattern.getReserve(share) ||
        // keyword
        pattern.getKeyword(share) ||
        // comment
        pattern.getComment(share) ||
        // id
        pattern.getIdentifier(share) ||
        // no match ? throw an exception
        ((tuple.fail = true) && tuple);
  return share;
}

function readsrc(path) {
  try {
    var src_str = fs.readFileSync(path).toString();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
  return share.src = src_str.split('\n');
}

function genTuple(type, code, token, fail) {
  return { type: type, lexunit: code, token: token, fail: fail };
}

function skip_space(share) {
  var teststr = share.src[share.c_row].slice(share.c_col);
  var rs = /^\s+/.exec(teststr);
  if (!teststr.length)
    share.c_row++, share.c_col = 0;
  if (rs) {
    if (!(teststr.length - rs[0].length))
      share.c_row++, share.c_col = 0;
    else
      share.c_col += rs[0].length;
  }
}

exports.scan = scan;
exports.readsrc = readsrc;
