const fpTree = require("./fpTree/fptree");

class FPGrowth {
  constructor(transactions) {
    this.transactions = transactions;
    this.itemscount = {};
    this.itemsOrderOfOccurance = {};
  }

  getCountsOfItems() {
    let counts = {};
    this.transactions.forEach((list) => {
      list.forEach((element) => {
        if (counts.hasOwnProperty(element)) {
          counts[element] += 1;
        } else {
          this.itemsOrderOfOccurance[element] = this.occuranceCount;
          this.occuranceCount++;
          counts[element] = 1;
        }
      });
    });
    return counts;
  }

  start() {
    // getting items counts of each unique item
    // console.log(this.transactions);
    this.itemscount = this.getCountsOfItems();
    console.log("items Counted");
    // Sorting the each transaction as the this.itemsCount
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

    console.log("sorting completed");

    //Creating FP Tree
    this.fpTree = new fpTree();
    this.fpTree.setItemsCount(this.itemscount);
    this.transactions.forEach((element) => {
      this.fpTree.insertTransaction(element);
    });

    console.log(
      this.fpTree.root.value,
      Object.keys(this.fpTree.root.childMap).length
    );
  }
}

module.exports = FPGrowth;
