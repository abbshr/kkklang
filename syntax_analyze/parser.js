var stmtProd = require('./stmt');
var exprProd = require('./expr');

function Parser(tuples) {
  this.tuples = tuples;
  this.sentences = [];
  this.lookahead = tuples[0];
  this.tindex = 0;
  this.length = tuples.length;
  this.tree = { name: 'stmt', child: [] };
  this.node = this.tree;
}

module.exports = Parser;

Parser.prototype.genNode = function (node, name) {
  var new_node = {
    name: name,
    child: []
  };
  node.child.push(new_node);
  return new_node;
};

Parser.prototype.parse = function () {
  while (this.tindex < this.length)
    this.STMT(this.node);
};

Parser.prototype.EXPR = function (node) { 
  return this.TYPE_E(node) || 
  this.OP_E(node) || 
  this.VALUE_E(node);
}

Parser.prototype.STMT = function (node) {
  return this.IF_S(node) ||
  this.UNLESS_S(node) ||
  this.LOOP_S(node) ||
  this.FUNC_S(node) ||
  this.NOOP_S(node) ||
  this.EXPR(node) || 
  this.FUNCINVO_S(node);
};

Parser.prototype.IF_S = stmtProd.IF_S
Parser.prototype.IF_T = stmtProd.IF_T
Parser.prototype.UNLESS_S = stmtProd.UNLESS_S
Parser.prototype.UNLESS_T = stmtProd.UNLESS_T
Parser.prototype.LOOP_S = stmtProd.LOOP_S
Parser.prototype.FUNC_S = stmtProd.FUNC_S
Parser.prototype.FUNC_T = stmtProd.FUNC_T
Parser.prototype.FUNC_F = stmtProd.FUNC_F
Parser.prototype.FUNCINVO_S = stmtProd.FUNCINVO_S
Parser.prototype.NOOP_S = stmtProd.NOOP_S

Parser.prototype.VALUE_E = exprProd.VALUE_E
Parser.prototype.TYPE_E = exprProd.TYPE_E
Parser.prototype.OP_E = exprProd.OP_E
Parser.prototype.E1 = exprProd.E1
Parser.prototype.T = exprProd.T
Parser.prototype.T1 = exprProd.T1
Parser.prototype.H = exprProd.H
Parser.prototype.H1 = exprProd.H1
Parser.prototype.I = exprProd.I
Parser.prototype.I1 = exprProd.I1
Parser.prototype.J = exprProd.J
Parser.prototype.J1 = exprProd.J1
Parser.prototype.F = exprProd.F
