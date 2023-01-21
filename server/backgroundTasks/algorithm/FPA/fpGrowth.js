const fpTree = require("./fpTree/fptree");

class FPGrowth {
  constructor(transactions) {
    this.transactions = transactions;
    this.itemscount = {};
    this.itemsOrderOfOccurance = {};
  }

  start() {
    // getting items counts of each unique item
    console.log(this.transactions);
    this.itemscount = this.getCountsOfItems();
    console.log(this.itemscount);

    // Sort the each transaction as the this.itemsCount
    this.transactions.forEach((transaction) => {
      for (var i = 0; i < transaction.length; i++) {
        for (var j = 0; j < transaction.length - i - 1; j++) {
          if (
            this.itemscount[transaction[j]] <
            this.itemscount[transaction[j + 1]]
          ) {
            var temp = transaction[j];
            transaction[j] = transaction[j + 1];
            transaction[j + 1] = temp;
          }
          if (
            this.itemscount[transaction[j]] ===
            this.itemscount[transaction[j + 1]]
          ) {
            if (
              this.itemsOrderOfOccurance[this.itemscount[transaction[j + 1]]] <
              this.itemsOrderOfOccurance[this.itemscount[transaction[j]]]
            ) {
              temp = transaction[j];
              transaction[j] = transaction[j + 1];
              transaction[j + 1] = temp;
            }
          }
        }
      }
    });

    console.log(this.transactions);

    //Creating FP Tree
    this.fpTree = new fpTree();
    this.fpTree.setItemsCount(this.itemscount);
    this.transactions.forEach((element) => {
      this.fpTree.insertTransaction(element);
    });
  }
}
