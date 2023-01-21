const FPGrowth = require("./algorithm/FPA/fpGrowth");
const gettransactionsFromBluePrint = require("./gettransactionsFromBluePrint");

const startFPARequest = function (itemsBluePrint, userId) {
  gettransactionsFromBluePrint(itemsBluePrint, userId).then(
    (transactionsList) => {
      //processing the transactions with only the itemNames only
      let transactions = [];
      transactionsList.forEach((transaction) => {
        let t = [];
        transaction.forEach((item) => {
          t.push(item.itemName);
        });
        transactions.push(t);
      });
      // console.log(transactions);
      let fp = new FPGrowth(transactions);
      fp.start();
    }
  );
};

module.exports = startFPARequest;
