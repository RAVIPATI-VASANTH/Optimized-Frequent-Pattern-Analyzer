const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const getItemFromFPARequets = (itemsBluePrint, userId) => {
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);

    async function getItemFromFPARequets() {
      try {
        const transactionsList = [];
        const database = client.db("MBAProjectDatabase");
        const transactions = database.collection("transactions");
        let cursor = await transactions.find({ userId: userId });
        console.log(itemsBluePrint);
        //need to implement the date also
        cursor.forEach((doc) => {
          console.log(doc);
          var signal = true;
          for (var i = 0; i < doc.itemsList.length; i++) {
            for (
              var j = 0;
              itemsBluePrint.selectedList.categories.length;
              j++
            ) {
              if (
                doc.itemsList[i].categoryName ===
                itemsBluePrint.selectedList.categories[j]
              ) {
                transactionsList.push(doc);
                console.log("pushed");
                signal = false;
              }
            }
          }
          if (signal) {
            for (var i = 0; i < doc.itemsList.length; i++) {
              for (var j = 0; itemsBluePrint.selectedList.brands.length; j++) {
                if (
                  doc.itemsList[i].itemBrand ===
                  itemsBluePrint.selectedList.brands[j]
                ) {
                  transactionsList.push(doc);
                  signal = false;
                }
              }
            }
          }
          if (signal) {
            for (var i = 0; i < doc.itemsList.length; i++) {
              for (var j = 0; j < itemsBluePrint.items.length; j++) {
                if (
                  doc.itemsList[i].itemName ===
                  itemsBluePrint.selectedList.items[j].itemName
                ) {
                  transactionsList.push(doc);
                }
              }
            }
          }
        });
        resolve();
      } finally {
      }
    }
    getItemFromFPARequets().catch((err) => {
      // console.dir;
      reject(err);
    });
  });
  promise
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
module.exports = getItemFromFPARequets;
