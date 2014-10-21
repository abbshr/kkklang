
var reserve = require('./reserve_words');
module.exports = {
  getDigit: digit,
  getString: string,
  getReserve: reserve,
  getKeyword: keyword,
  getIdentifier: identifier,
  getComment: comment
};

function digit(args) {

  args.s_row = args.c_row;
  args.s_col = args.c_col;
  var teststr = args.src[args.c_row].slice(args.c_col);
  var rs = /^(-?([0-9]+\.)*[0-9]+)([^a-zA-Z0-9\.]+.*)?$/.exec(teststr)
  if (rs) {
    args.tuple.lexunit = 'digit';
    args.tuple.token = rs[1];
    if (!(teststr.length - rs[1].length))
      args.c_row++, args.c_col = 0;
    else
      args.c_col += rs[1].length;
  }
  return rs && args.tuple;
}

function string(args) {

  args.s_row = args.c_row;
  args.s_col = args.c_col;
  var teststr = args.src[args.c_row].slice(args.c_col);
  var rs = /^(".*")/.exec(teststr);
  if (rs) {
    args.tuple.lexunit = 'string';
    args.tuple.token = rs[1];
    if (!(teststr.length - rs[1].length))
      args.c_row++, args.c_col = 0;
    else
      args.c_col += rs[1].length;
  }
  return rs && args.tuple;
}

function keyword(args) {

  args.s_row = args.c_row;
  args.s_col = args.c_col;
  var teststr = args.src[args.c_row].slice(args.c_col);
  var rs = /^(\w+)\s*/.exec(teststr);
  var r;
  if (rs) {
    code.forEach(function (e, i) {
      if (e == rs[1]) {
        r = true;
        args.tuple.lexunit = e;
        args.tuple.token = rs[1];
        if (!(teststr.length - rs[1].length))
          args.c_row++, args.c_col = 0;
        else
          args.c_col += rs[1].length;
      }
    });
    return r && args.tuple;
  }
}

function reserve(args) {

  args.s_row = args.c_row;
  args.s_col = args.c_col;
  var teststr = args.src[args.c_row].slice(args.c_col);
  var rs = /^(true|false|nil|[^\w\d\s]+)\s*/.exec(teststr);
  var r;
  if (rs) {
    code.forEach(function (e, i) {
      if (e == rs[1]) {
        r = true;
        args.tuple.lexunit = 'reserve';
        args.tuple.token = rs[1];
        if (!(teststr.length - rs[1].length))
          args.c_row++, args.c_col = 0;
        else
          args.c_col += rs[1].length;
      }
    });
    return r && args.tuple;
  }
}

function identifier(args) {

  args.s_row = args.c_row;
  args.s_col = args.c_col;
  var teststr = args.src[args.c_row].slice(args.c_col);
  var rs = /^([_a-zA-Z]+[_a-zA-Z0-9]*)\s*/.exec(teststr);
  if (rs) {
    args.tuple.lexunit = 'id';
    args.tuple.token = rs[1];
    if (!(teststr.length - rs[1].length))
      args.c_row++, args.c_col = 0;
    else
      args.c_col += rs[1].length;
  }
  return rs && args.tuple;
}

function comment(args) {

  args.s_row = args.c_row;
  args.s_col = args.c_col;
  var teststr = args.src[args.c_row].slice(args.c_col);
  var rs = /^#.*/.exec(teststr);
  if (rs) {
    args.tuple.lexunit = 'comment';
    args.tuple.token = rs[0];
    args.c_row++, args.c_col = 0;
  }
  return rs && args.tuple;
}
