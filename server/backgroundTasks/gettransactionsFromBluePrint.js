const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const getFinalTransactions = (transactions, itemsBluePrint) => {
  var finalTransactions = [];
  var itemNamesInBluePrint = [];
  itemsBluePrint.selectedList.items.forEach((item) => {
    itemNamesInBluePrint.push(item.itemName);
  });
  for (var i = 0; i < transactions.length; i++) {
    for (var j = 0; j < transactions[i].length; j++) {
      var curItem = transactions[i][j];
      if (
        itemsBluePrint.selectedList.categories.indexOf(curItem.categoryName) >=
        0
      ) {
        finalTransactions.push(transactions[i]);
        break;
      }
      if (itemsBluePrint.selectedList.brands.indexOf(curItem.itemBrand) >= 0) {
        finalTransactions.push(transactions[i]);
        break;
      }
      if (itemNamesInBluePrint.indexOf(curItem.itemName) >= 0) {
        finalTransactions.push(transactions[i]);
        break;
      }
    }
  }
  return finalTransactions;
};

const gettransactionsFromBluePrint = async (itemsBluePrint, userId) => {
  return new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);

    async function getTransactionsFromFPARequets() {
      try {
        let transactionsList = [];
        const database = client.db("MBAProjectDatabase");
        const transactions = database.collection("transactions");
        // date classification
        if (itemsBluePrint.date.from && itemsBluePrint.date.to) {
          //both dates
          let from = new Date(itemsBluePrint.date.from);
          let to = new Date(itemsBluePrint.date.to);
          let cursor = transactions.find({
            userId: userId,
            timeStamp: { $lte: to, $gte: from },
          });
          var t = [];
          await cursor.forEach((doc) => {
            t.push(doc.itemsList);
          });
          transactionsList = getFinalTransactions(t, itemsBluePrint);
        } else if (itemsBluePrint.date.from) {
          //from date
          let from = new Date(itemsBluePrint.date.from);
          let cursor = transactions.find({
            userId: userId,
            timeStamp: { $gte: from },
          });
          var t = [];
          await cursor.forEach((doc) => {
            t.push(doc.itemsList);
          });
          transactionsList = getFinalTransactions(t, itemsBluePrint);
        } else if (itemsBluePrint.date.to) {
          //to date
          console.log("to date");
          let to = new Date(itemsBluePrint.date.to);
          let cursor = transactions.find({
            userId: userId,
            timeStamp: { $lte: to },
          });
          var t = [];
          await cursor.forEach((doc) => {
            t.push(doc.itemsList);
          });
          transactionsList = getFinalTransactions(t, itemsBluePrint);
        } else {
          //No to date and No from date
          console.log("no date");
          let cursor = transactions.find({
            userId: userId,
          });
          var t = [];
          await cursor.forEach((doc) => {
            t.push(doc.itemsList);
          });
          transactionsList = getFinalTransactions(t, itemsBluePrint);
        }
        resolve(transactionsList);
      } finally {
      }
    }
    getTransactionsFromFPARequets().catch((err) => {
      console.log(err);
      reject(err);
    });
  });
};
module.exports = gettransactionsFromBluePrint;
