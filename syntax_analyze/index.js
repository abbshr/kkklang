var Parser = require('./parser');
var parser = new Parser(tuples);

var scanner = require('../lexical_analyze/scanner');
var scan = scanner.scan;
var readsrc = scanner.readsrc;
var src = readsrc(process.argv[2] || 'text');
var len = src.length;
var tuples = [];

do {
  var result = scan();
  if (!result.tuple.fail)
    tuples.push(result.tuple);
  else
    throw new SyntaxError('Line '+ (result.s_row + 1) + ', Column '+ (result.s_col + 1)+ ': Unexpected Token');
  
} while (result.c_row < len)

parser.parse();

function rec(p, s) {
  console.log(s, '{ node name: ', p.name);
  if (p.child) {
    console.log(s + '  ', 'child: [');
    p.child.forEach(function (e) {
      rec(e, s + '   ');
    });
    console.log(s + '  ', ']');
  }
  console.log(s, '}');
}

rec(parser.tree, ' ');
