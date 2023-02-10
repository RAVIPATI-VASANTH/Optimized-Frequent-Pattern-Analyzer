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

// const getAllBrands = (itemsBluePrint, userId) => {
//   let brandsList = [];
//   const client = new MongoClient(uri);
//   const database = client.db("MBAProjectDatabase");
//   const retailerItems = database.collection("retailerItems");
//   let cursor = retailerItems.find({ userId: userId });
//   cursor.forEach((doc) => {
//     // console.log(doc.categoryName);
//     if (itemsBluePrint.selectedList.categories.indexOf(doc.categoryName) >= 0) {
//       doc.itemsList.forEach((item) => {
//         brandsList.push(item.itemBrand);
//       });
//     } else {
//       doc.itemsList.forEach((item) => {
//         if (itemsBluePrint.selectedList.brands.indexOf(item.itemBrand) >= 0) {
//           brandsList.push(item.itemBrand);
//         } else {
//           let l = [];
//           itemsBluePrint.selectedList.items.forEach((i) => {
//             l.push(i.itemBrand);
//           });
//           if (l.indexOf(item.itemBrand) >= 0) {
//             brandsList.push(item.itemBrand);
//           }
//         }
//       });
//     }
//   });
//   return brandsList;
// };

const getBrandStatesFromBluePrint = async (itemsBluePrint, userId) => {
  try {
    let transactionsList = [];
    const client = new MongoClient(uri);

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
      // console.log("to date");
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
      // console.log("no date");
      let cursor = transactions.find({
        userId: userId,
      });
      var t = [];
      await cursor.forEach((doc) => {
        t.push(doc.itemsList);
      });
      transactionsList = getFinalTransactions(t, itemsBluePrint);
    }
    resultmap = {};
    transactionsList.forEach((transaction) => {
      transaction.forEach((item) => {
        if (Object.keys(resultmap).indexOf(item.categoryName) >= 0) {
          if (
            Object.keys(resultmap[item.categoryName]).indexOf(item.itemBrand) >=
            0
          ) {
            resultmap[item.categoryName][item.itemBrand] += 1;
          } else {
            resultmap[item.categoryName][item.itemBrand] = 1;
          }
        } else {
          let obj = {};
          obj[item.itemBrand] = 1;
          resultmap[item.categoryName] = obj;
        }
      });
    });
    //   console.log(resultmap);
    return resultmap;
  } finally {
  }
};

module.exports = getBrandStatesFromBluePrint;
