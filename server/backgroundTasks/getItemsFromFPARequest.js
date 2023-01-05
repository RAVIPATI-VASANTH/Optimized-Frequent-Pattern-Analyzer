const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const getItemFromFPARequets = (itemsBluePrint, userId) => {
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);
    async function getItemFromFPARequets() {
      try {
        const database = client.db("MBAProjectDatabase");
        const transactions = database.collection("transactions");
        let cursor = await transactions.find({ userId: userId });
        cursor.forEach((doc) => {
          console.log(doc);
        });
        await client.close();
        resolve();
      } finally {
      }
    }
    getItemFromFPARequets().catch((err) => {
      reject(err);
    });
  });
  promise.then(() => {}).catch((err) => {});
};
module.exports = getItemFromFPARequets;
