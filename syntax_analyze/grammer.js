module.exports = {
  //'S': '',
  'stmt': [
    // if-elsif-else 
    ['if', 'expr', 'then', 'stmt', 'elif', 'expr', 'then', 'stmt', 'else', 'stmt', 'end'],
    ['if', 'expr', 'then', 'stmt', 'elif', 'expr', 'then', 'stmt', 'end'],
    ['if', 'expr', 'then', 'stmt', 'else', 'stmt', 'end'],
    ['if', 'expr', 'then', 'stmt', 'end'],
    //['elif', 'expr', 'then', 'stmt'],
    //['else', 'stmt'],
    // unless-else
    ['unless', 'expr', 'then', 'stmt', 'else', 'stmt', 'end'],
    ['unless', 'expr', 'then', 'stmt', 'end'],
    // loop
    ['loop', 'expr', ',', 'expr', ',', 'expr', 'do', 'stmt', 'end'],
    // function defined
    ['func', 'id', '(', 'id', ')', '=>', 'stmt', 'end'],
    // valued
    ['id', ':=', 'expr'],
    // type
    ['type', 'expr'],
    ['expr'],
    ['noop']
  ],
  'expr': [
    ['digit'],
    ['string'],
    ['True'],
    ['False'],
    ['nil'],
    ['id'],
    ['expr', 'operator', 'expr'],
    ['operator', 'expr'],
    ['']
  ],
  'operator': [
    "+", "-", '*', '/', '^', '%',
    ">", '<', '=', '>=', '<=', '~=',
    ':=',
    '&', '|', '~',
    'and', 'or', 'not'
  ]
};