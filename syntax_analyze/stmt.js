exports.IF_S = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token == 'if') {
    var new_node = {
      name: 'stmt',
      child: []
    };
    new_node.child.push({
      name: this.lookahead.token
    });
    node.child.push(new_node);
    this.lookahead = this.tuples[++this.tindex];
    this.EXPR(new_node);
    if (this.lookahead.token == 'then') {
      new_node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      this.STMT(new_node);
      this.IF_T(new_node);
      if (this.lookahead.token == 'end') {
        new_node.child.push({
          name: this.lookahead.token
        });
        this.lookahead = this.tuples[++this.tindex];
        return 1;
      } else
        throw new SyntaxError('if scope not closed: missing keyword "end"');
    } else 
      throw new SyntaxError('if statement: missing keyword "then"');
  }
}

exports.IF_T = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token == 'elif') {
    node.child.push({
      name: this.lookahead.token
    });
    this.lookahead = this.tuples[++this.tindex];
    this.EXPR(node);
    if (this.lookahead.token == 'then') {
      node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      this.STMT(node);
      this.IF_T(node);
    } else
      throw new SyntaxError('if statement: missing keyword "then"');
  } else if (this.lookahead.token == 'else') {
    node.child.push({
      name: this.lookahead.token
    });
    this.lookahead = this.tuples[++this.tindex];
    this.STMT(node);
  }
}

exports.UNLESS_S = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token == 'unless') {
    var new_node = {
      name: 'stmt',
      child: []
    };
    new_node.child.push({
      name: this.lookahead.token
    });
    node.child.push(new_node);
    this.lookahead = this.tuples[++this.tindex];
    this.EXPR(new_node);
    if (this.lookahead.token == 'then') {
      new_node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      this.STMT(new_node);
      this.UNLESS_T(new_node);
      if (this.lookahead.token == 'end') {
        new_node.child.push({
          name: this.lookahead.token
        });
        this.lookahead = this.tuples[++this.tindex];
        return 1;
      } else
        throw new SyntaxError('unless scope not closed: missing keyword "end"');
    } else 
      throw new SyntaxError('unless statement: missing keyword "then"');
  }
}

exports.UNLESS_T = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token == 'else') {
    node.child.push({
      name: this.lookahead.token
    });
    this.lookahead = this.tuples[++this.tindex];
    this.STMT(node);
  }
}

exports.LOOP_S = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token == 'loop') {
    var new_node = {
      name: 'stmt',
      child: []
    };
    new_node.child.push({
      name: this.lookahead.token
    });
    node.child.push(new_node);
    this.lookahead = this.tuples[++this.tindex];
    this.EXPR(new_node);
    if (this.lookahead.token == ',') {
      new_node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      this.EXPR(new_node);
      if (this.lookahead.token == ',') {
        new_node.child.push({
          name: this.lookahead.token
        });
        this.lookahead = this.tuples[++this.tindex];
        this.EXPR(new_node);
        if (this.lookahead.token == 'do') {
          new_node.child.push({
            name: this.lookahead.token
          });
          this.lookahead = this.tuples[++this.tindex];
          this.STMT(new_node);
          if (this.lookahead.token == 'end') {
            new_node.child.push({
              name: this.lookahead.token
            });
            this.lookahead = this.tuples[++this.tindex];
            return 1;
          } else
            throw new SyntaxError('loop scope not closed: missing keyword "end"');
        } else {
          throw new SyntaxError('loop statement: missing keyword "do"');
        }
      } else 
        throw new SyntaxError('loop statement: missing ","');
    } else 
      throw new SyntaxError('loop statement: missing ","');
  }
}

exports.FUNC_S = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token == 'func') {
    var new_node = {
      name: 'stmt',
      child: []
    };
    new_node.child.push({
      name: this.lookahead.token
    });
    node.child.push(new_node);
    this.lookahead = this.tuples[++this.tindex];
    if (this.lookahead.lexunit == 'id') {
      new_node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      if (this.lookahead.token == '(') {
        new_node.child.push({
          name: this.lookahead.token
        });
        this.lookahead = this.tuples[++this.tindex];
        this.FUNC_T(new_node);
        if (this.lookahead.token == ')') {
          new_node.child.push({
            name: this.lookahead.token
          });
          this.lookahead = this.tuples[++this.tindex];
          if (this.lookahead.token == '=>') {
            new_node.child.push({
              name: this.lookahead.token
            });
            this.lookahead = this.tuples[++this.tindex];
            this.STMT(new_node);
            if (this.lookahead.token == 'end') {
              new_node.child.push({
                name: this.lookahead.token
              });
              this.lookahead = this.tuples[++this.tindex];
              return 1;
            } else
              throw new SyntaxError('function scope not closed: missing keyword "end"');
          } else
            throw new SyntaxError('function statement: missing a "=>"');
        } else 
          throw new SyntaxError('function statement: missing a ")');
      } else 
        throw new SyntaxError('function statement: missing a "("');
    } else 
      throw new SyntaxError('function statement: function name must be a variable');
  }
}

exports.FUNC_T = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.lexunit == 'id') {
    node.child.push({
      name: this.lookahead.token
    });
    this.lookahead = this.tuples[++this.tindex];
    this.FUNC_F(node);
  }
}

exports.FUNC_F = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token == ',') {
    node.child.push({
      name: this.lookahead.token
    });
    this.lookahead = this.tuples[++this.tindex];
    if (this.lookahead.lexunit == 'id') {
      node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      this.FUNC_F(node);
    }
  }
}

exports.FUNCINVO_S = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.lexunit == 'id') {
    var new_node = {
      name: 'stmt',
      child: []
    };
    new_node.child.push({
      name: this.lookahead.token
    });
    node.child.push(new_node);
    this.lookahead = this.tuples[++this.tindex];
    if (this.lookahead.token == '(') {
      new_node.child.push({
        name: this.lookahead.token
      });
      this.lookahead = this.tuples[++this.tindex];
      this.EXPR(new_node);
      if (this.lookahead.token == ')') {
        this.lookahead = this.tuples[++this.tindex];
        return 1;
      } else 
        throw new SyntaxError('in function invocking: missing a ")"');
    }
  }
};

exports.NOOP_S = function (node) {
  if (!this.lookahead) return;
  if (this.lookahead.token =='noop') {
    var new_node = {
      name: 'stmt',
      child: []
    };
    new_node.child.push({
      name: this.lookahead.token
    });
    node.child.push(new_node);
    this.lookahead = this.tuples[++this.tindex];
    return 1;
  }
}
