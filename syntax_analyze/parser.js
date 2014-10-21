
var grammer = require('./grammer');

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
    return console.log('Line', (result.s_row + 1) , ', Column', (result.s_col + 1), ': Unexpected Token');
  
} while (result.c_row < len)

tree = { _name: 'stmt' }
node = tree
k = i = 0
lookahead = tuples[0]

while (i < tuples.length)
  if (!parse(node))
    break; 

function parse(node) {
  k = i
  if (grammer[node._name]) {
    r = grammer[node._name].some(function (p) {
      s = p.every(function (e) {
        return parse({ _name: e })
      })
      if (s)
        return p.forEach(function (e, j) {
          node[j] = parse({ _name: e })
        }) || s
      else {
        i = k
        return false
      }
    })
    if (r)
      return node
    else {
      i = k
      return null
    }
  } else if (lookahead.token == node._name || lookahead.lexunit == node._name) {
    node._name = lookahead.token
    lookahead = tuples[++i]
    return node;
  } else
    return null
}