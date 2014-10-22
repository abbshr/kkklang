
exports.VALUE_E = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.lexunit == 'id') {
    var new_node = this.genNode(node, 'expr');
    new_node.child.push({
      name: this.lookahead.token
    });
    this.lookahead = this.tuples[++this.tindex];
    if (this.lookahead.token == ':=') {
      new_node.child.push({
        name: this.lookahead.token
      });
      this.EXPR(new_node);
      return 1;
    } /*else
      throw new SyntaxError('invalided valued statement');*/
  }
}

exports.TYPE_E = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token == 'type') {
    var new_node = this.genNode(node, 'expr');
    new_node.child.push({
      name: this.lookahead.token
    });
    this.lookahead = this.tuples[++this.tindex];
    this.EXPR(new_node);
    return 1;
  }
}

exports.OP_E = function (node) {
  var new_node = this.genNode(node, 'expr');
  this.T(new_node);
  this.E1(new_node);
  return 1;
}

exports.E1 = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token == 'and' || this.lookahead.token == 'or') {
    node.child.push({
      name: this.lookahead.token
    });
    this.lookahead = this.tuples[++this.tindex];
    this.T(node);
    this.E1(node);
  } else if (this.lookahead.token == ')') {
    return null;
  } /*else {
    throw new Error('Syntax Error');
  }*/
}

exports.T = function (node) {
  this.H(node);
  this.T1(node);
}

exports.T1 = function (node) {
  if (!this.lookahead) return;
  switch (this.lookahead.token) {
    case '>':
    case '<':
    case '=':
    case '>=':
    case '<=':
    case '~=':
      node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      this.H(node);
      this.T1(node);
      break;
    case ')':
    case 'and':
    case 'or':
      return null;
    default:
      return null;
      //throw new Error('Syntax Error');
  }
}

exports.H = function (node) {
  this.I(node);
  this.H1(node);
}

exports.H1 = function (node) {
  if (!this.lookahead) return;
  switch (this.lookahead.token) {
    case '+':
    case '-':
      node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      this.I(node);
      this.H1(node);
      break;
    case ')':
    case 'and':
    case 'or':
    case '>':
    case '<':
    case '=':
    case '>=':
    case '<=':
    case '~=':
      return null;
    default:
      return null;
      //throw new Error('Syntax Error');
  }
}

exports.I = function (node) {
  this.J(node);
  this.I1(node);
}

exports.I1 = function (node) {
  if (!this.lookahead) return;
  switch (this.lookahead.token) {
    case '*':
    case '/':
    case '^':
    case '%':
      node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      this.J(node);
      this.I1(node);
      break;
    case ')':
    case 'and':
    case 'or':
    case '>':
    case '<':
    case '=':
    case '>=':
    case '<=':
    case '~=':
    case '+':
    case '-':
      return null;
    default:
      //throw new Error('Syntax Error');
      return null;
  }
}

exports.J = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token == '~' || this.lookahead.token == 'not') {
    node.child.push({
      name: this.lookahead.token
    });
    this.lookahead = this.tuples[++this.tindex];
    this.J(node);
    this.J1(node);
  } else {
    this.F(node);
    this.J1(node);
  }
}

exports.J1 = function (node) {
  if (!this.lookahead) return;
  switch (this.lookahead.token) {
    case '&':
    case '|':
      node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      this.F(node);
      this.J1(node);
      break;
    case ')':
    case 'and':
    case 'or':
    case '>':
    case '<':
    case '=':
    case '>=':
    case '<=':
    case '~=':
    case '+':
    case '-':
    case '*':
    case '/':
    case '^':
    case '%':
    case '~':
    case 'not':
      return null;
    default:
      return null;
      //throw new Error('Syntax Error');
  }
}

exports.F = function (node) {
  if (!this.lookahead) return;
  switch (this.lookahead.lexunit) {
    case 'id':
    case 'digit':
    case 'string':
    case 'bool':
    case 'nil':
      node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      break;
    default:
      if (this.lookahead.token == '(') {
        node.child.push({
          name: this.lookahead.token
        });
        lookahead = this.tuples[++this.tindex];
        this.EXPR(node);
        if (this.lookahead.token == ')') {
          node.child.push({
            name: this.lookahead.token
          });
          this.lookahead = this.tuples[++this.tindex];
        } else
          throw new Error('Syntax Error');
      }
  }
}