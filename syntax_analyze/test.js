/*var tuples = [
  { token: 'not', lexunit: 'op' },
  { token: '(', lexunit: 'delim' },
  { token: 'a', lexunit: 'id' },
  { token: '+', lexunit: 'op' },
  { token: '~', lexunit: 'op' },
  { token: 'b', lexunit: 'id' },
  { token: '*', lexunit: 'op' },
  { token: '(', lexunit: 'delim' },
  { token: 'c', lexunit: 'id' },
  { token: '-', lexunit: 'op' },
  { token: 'd', lexunit: 'id' },
  { token: ')', lexunit: 'delim' },
  { token: ')', lexunit: 'delim' },
  { token: 'or', lexunit: 'op' },
  { token: '(', lexunit: 'delim' },
  { token: 1, lexunit: 'digit' },
  { token: '+', lexunit: 'op' },
  { token: 2, lexunit: 'digit' },
  { token: ')', lexunit: 'delim' },
];

*tuples = [
  { token: 'not', lexunit: 'op' },
  { token: 'b', lexunit: 'id' }
]*/

tuples = [
  { token: 'if', lexunit: 'if' },
  //{token: '(', lexunit: 'delim'},
  { token: 'a', lexunit: 'id' },
  { token: '+', lexunit: 'op' },
  { token: 'b', lexunit: 'id' },
  { token: '*', lexunit: 'op' },
  { token: 'c', lexunit: 'id' },
  //{token: ')', lexunit:'delim'},
  { token: 'then', lexunit: 'keyword' },
  { token: 'noop', lexunit: 'keyword' },
  {token: 'elif', lexunit: 'elif'},
  { token: 'a', lexunit: 'id' },
  { token: '+', lexunit: 'op' },
  { token: 'b', lexunit: 'id' },
  { token: 'then', lexunit: 'keyword' },
  {token: 'noop', lexunit: 'keyword'},
  {token: 'else', lexunit: 'else'},
  {token: 'noop', lexunit: 'keyword'},
  { token: 'end', lexunit: 'end' },
  { token: 'func', lexunit: 'keyword' },
  { token: 'f', lexunit: 'id' },
  {token: '(', lexunit: 'delim'},
    {token: 'x', lexunit: 'id'},
    {token: ',', lexunit: 'delim'},
    {token: 'z', lexunit: 'id'},
    {token: ')', lexunit:'delim'},
  {token: '=>', lexunit:'delim'},
  {token: 'a', lexunit: 'id'},
  {token:'+', lexunit: 'op'},
  {token: 'b', lexunit: 'id'},
  {token: 'end', lexunit: 'end'}
]

var Parser = require('./parser');
var parser = new Parser(tuples);
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