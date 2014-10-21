
var scanner = require('./scanner');
var scan = scanner.scan;
var readsrc = scanner.readsrc;

var src = readsrc(process.argv[2] || 'text');
var len = src.length;
var result;
var tuples = [];
var text, buf = '';

console.log('Scanner Result:');
console.log('==============');

do {
  result = scan();
  text = 'Line ' + (result.s_row + 1) + ', Column ' + (result.s_col + 1) + ' : ';
  if (result.tuple.fail) {
    text += 'Unexpected Token';
    console.log(text);
    buf += text + '\n';
    require('fs').writeFileSync('result', buf);
    break;
  } else {
    tuples.push(result.tuple);
    text += ' < ' + result.tuple.lexunit + ', ' + result.tuple.token + ' >';
    console.log(text);
    buf += text + '\n';
    require('fs').writeFileSync('result', buf);
  }
} while (result.c_row < len)

module.exports = 
