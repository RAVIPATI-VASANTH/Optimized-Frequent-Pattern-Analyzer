const FPTreeNode = require("./fptreenode");

class FPTree {
  constructor() {
    this.root = new FPTreeNode("null");
    this.root.count = 1;
    this.itemsCount = {};
  }

  setItemsCount(itemsCount) {
    this.itemsCount = itemsCount;
  }

  insertTransaction(transaction) {
    let i = 0;
    let temp = this.root;
    while (i < transaction.length) {
      if (temp.childMap.hasOwnProperty(transaction[i])) {
        temp = temp.childMap[transaction[i]];
        temp.count += 1;
        i++;
      } else {
        let newChild = new FPTreeNode(transaction[i]);
        temp.childMap[transaction[i]] = newChild;
        temp = newChild;
        i++;
      }
    }
  }
}

module.exports = FPTree;
