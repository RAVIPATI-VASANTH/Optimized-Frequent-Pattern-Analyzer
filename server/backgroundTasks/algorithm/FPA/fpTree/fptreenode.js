class FPTreeNode {
  constructor(value) {
    this.value = value;
    this.count = 1;
    this.childMap = {}; //{"A": <FPTreeNode>}
    // this.parent=null;
  }
}

module.exports = FPTreeNode;
