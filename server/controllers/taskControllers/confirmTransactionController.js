const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const confirmTransactionController = (req, res) => {
  let promise = new Promise(function (resolve, reject) {
    const client = new MongoClient(uri);

    async function confirmTransaction() {
      try {
        const database = client.db("MBAProjectDatabase");
        const transactions = database.collection("transactions");
        await transactions.insertOne(JSON.parse(req.query.transaction));
        await client.close();
        resolve();
      } finally {
        client.close();
      }
    }
    confirmTransaction().catch((err) => {
      reject();
      console.log(err);
    });
  });
  promise
    .then(() => {
      res.json({ message: true });
    })
    .catch(() => {
      res.json({ message: false });
    });
};

module.exports = confirmTransactionController;
